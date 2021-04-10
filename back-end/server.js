const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const multer = require('multer');
const argon2 = require("argon2");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const upload = multer({
  dest: '../front-end/public/videos/',
  limits: {
    fileSize: 100000000
  }
});

const uploadFile = multer({
  dest: '../front-end/public/files/',
  limits: {
    fileSize: 100000000
  }
});

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


app.use(cookieSession({
  name: 'session',
  keys: ['secretValue'],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/hackathon', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const companySchema = new mongoose.Schema({
  companyName: String,
  username: String,
  password: String
});

// This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
companySchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // generate a hash. argon2 does the salting and hashing for us
    const hash = await argon2.hash(this.password);
    // override the plaintext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the has of the user's true password stored in
// the database.
companySchema.methods.comparePassword = async function (password) {
  try {
    // note that we supply the hash stored in the database (first argument) and
    // the plaintext password. argon2 will do the hashing and salting and
    // comparison for us.
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
companySchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

/* Middleware */

// middleware function to check for logged-in users
const validCompany = async (req, res, next) => {
  if (!req.session.companyID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const company = await Company.findOne({
      _id: req.session.companyID
    });
    if (!company) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.company = company;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // if everything succeeds, move to the next middleware
  next();
};

app.post('/api/companies', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // passsword, otherwise return an error. A 400 error means the request was
  // malformed.
  console.log("register hit");
  if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "username and password are required"
    });

  try {

    //  Check to see if username already exists and if not send a 403 error. A 403
    // error means permission denied.
    const existingCompany = await Company.findOne({
      username: req.body.username
    });
    if (existingCompany)
      return res.status(403).send({
        message: "username already exists"
      });

    // create a new user and save it to the database
    const company = new Company({
      companyName: req.body.companyName,
      username: req.body.username,
      password: req.body.password
    });
    await company.save();
    // set user session info
    req.session.companyID = company._id;
    // send back a 200 OK response, along with the user that was created
    return res.send({
      company: company
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// login a user
app.post('/api/companies/login', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // password, otherwise return an error.
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);

  try {
    //  lookup user record
    const company = await Company.findOne({
      username: req.body.username
    });
    // Return an error if user does not exist.
    if (!company)
      return res.status(403).send({
        message: "username or password is wrong"
      });

    // Return the SAME error if the password is wrong. This ensure we don't
    // leak any information about which users exist.
    if (!await company.comparePassword(req.body.password))
      return res.status(403).send({
        message: "username or password is wrong"
      });

    // set user session info
    req.session.companyID = company._id;
    return res.send({
      company: company
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get logged in user
app.get('/api/companies', validCompany, async (req, res) => {
  try {
    res.send({
      company: req.company
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// logout
app.delete("/api/companies", validCompany, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


const applicationSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  applicationName: String,
  infoModule: {
    companyName: String,
    teamName: String,
    roleName: String,
    roleDescription: String,
    introVideoPath: String
  },
  modules: []
});

const Company = new mongoose.model('Company', companySchema);
const Application = new mongoose.model('Application', applicationSchema);

// app.post('/api/companies', async (req, res) => {
//   const company = new Company({
//     companyName: req.body.companyName,
//   });
//   try {
//     await company.save();
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

app.post('/api/companies/:companyID/applications', async (req, res) => {
  // do we need to delete the old application record?
  if (req.body.ifEditThenApplicationIDIs.length > 0) {
    try {
      let application = await Application.findOne({_id: req.body.ifEditThenApplicationIDIs, company: req.params.companyID});
      if (!application) {
        res.send(404);
        return;
      }
      await application.delete();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
  let company = await Company.findOne({ _id: req.params.companyID });
  if (!company) {
    res.send(404);
    return;
  }
  console.log(req.body.infoModule);

  const application = new Application({
    company: company,
    applicationName: req.body.applicationName,
    infoModule: req.body.infoModule,
    modules: req.body.modules
  });
  try {
    await application.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




app.get('/api/companies/:companyID/applications/:applicationID', async (req, res) => {
  try {
    
    let application = await Application.findOne({ _id: req.params.applicationID, company: req.params.companyID });
    console.log(application);
    res.send(application);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/companies/:companyID/applications/:applicationID', async (req, res) => {
  try {
    let application = await Application.findOne({_id:req.params.applicationID, company: req.params.companyID});
    if (!application) {
      res.send(404);
      return;
    }
    await application.delete();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/companies/:companyID/applications', async (req, res) => {
  try {
    let company = await Company.findOne({ _id: req.params.companyID });
    if (!company) {
      res.send(404);
      return;
    }
    let applications = await Application.find({ company: company });
    res.send(applications);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




app.post('/api/videos', upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }

  res.send({
    path: "/videos/" + req.file.filename
  });
});

app.post('/api/files', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }

  res.send({
    path: "/files/" + req.file.filename
  });
});


// listen on port 3000
app.listen(3000, () => console.log('Server listening on port 3000!'));