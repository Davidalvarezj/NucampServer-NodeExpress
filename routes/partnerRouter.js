const express = require("express");
const partnerRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

const Partner = require("../models/partner");

partnerRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    // localhost:3000/partner, GET all campsites collections
    Partner.find()
      .then((partners) => {
        res.status(200).json(partners);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/partner, POST a new campsites collections inside body msg
      Partner.create(req.body)
        .then((partner) => {
          res.status(200).json(partner);
        })
        .catch((err) => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.status = 403;
      res.end("PUT operation not supported on /partners");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/partner, DELETE all campsites collections
      Partner.deleteMany()
        .then((partners) => {
          res.status(200).json(partners);
        })
        .catch((err) => next(err));
    }
  );

partnerRouter
  .route("/:partnerId")

  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    // localhost:3000/partners/:partnerId, GET specific campsite collection "campsiteId"
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.status(200).json(partner);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.status = 403;
      res.end(
        `POST operation not supported on /partners/${req.params.partnerId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/partners/:partnersd, PUT new field data to the specific :campsiteId using body msg
      Partner.findByIdAndUpdate(
        req.params.partnerId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((partner) => {
          res.status(200).json(partner);
        })
        .catch((err) => next(err));
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/parner/:campsiteId, DELETE the specific document :campsiteId
      Partner.findByIdAndDelete(req.params.partnerId)
        .then((partner) => {
          res.status(200).json(partner);
        })
        .catch((err) => next(err));
    }
  );

module.exports = partnerRouter;
