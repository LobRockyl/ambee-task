const express = require('express');
const router = express.Router();
const aqiCalculator = require('../services/AQIcalculator')

//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')

//------------ Login Route ------------//
router.get('/login', (req, res) => res.render('login'));

//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});

//------------ Register Route ------------//
router.get('/register', (req, res) => res.render('register'));

//------------ Register POST Handle ------------//
router.post('/register', authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/forgot', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

router.post('/aqi', async (req, res, next) => {
    const email = req.body.email;
    let d = {
        datetime: Date.now(), //Taking the 24-hour average concentration  - change when you use this example
        pm25: null,
        pm10: null,
        so2: null,
        no: null,
        nox: null,
        no2: null,
        o3: null,
        co: null,
      };
      d[req.body.pollutant]=req.body.value;
      res.render('dash',{
        aqi: {pollutant:req.body.pollutant, value: req.body.value,aqi:await aqiCalculator.calculate(d)},
        name: req.body.name
      });
    
  });
module.exports = router;