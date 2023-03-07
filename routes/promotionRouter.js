const express = require("express");
const promotionRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");

const Promotion = require("../models/promotion");

promotionRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    // localhost:3000/promotion, GET all campsites collections

    Promotion.find()
      .then((promotions) => {
        res.status(200).json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/promotion, POST a new campsites collections inside body msg
      Promotion.create(req.body)
        .then((promotion) => {
          res.status(200).json(promotion);
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
      res.end("PUT operation not supported on /promotions");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/promotion, DELETE all campsites collections
      Promotion.deleteMany()
        .then((promotions) => {
          res.status(200).json(promotions);
        })
        .catch((err) => next(err));
    }
  );

promotionRouter
  .route("/:promotionId")

  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    // localhost:3000/promotions/:promotionId, GET specific campsite collection "campsiteId"
    Promotion.findById(req.params.promotionId)
      .then((promotion) => {
        res.status(200).json(promotion);
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
        `POST operation not supported on /promotions/${req.params.promotionId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      // localhost:3000/promotions/:promotionsd, PUT new field data to the specific :campsiteId using body msg
      Promotion.findByIdAndUpdate(
        req.params.promotionId,
        {
          $set: req.body,
        },
        { new: true }
      )
        .then((promotion) => {
          res.status(200).json(promotion);
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
      Promotion.findByIdAndDelete(req.params.promotionId)
        .then((promotion) => {
          res.status(200).json(promotion);
        })
        .catch((err) => next(err));
    }
  );

module.exports = promotionRouter;
