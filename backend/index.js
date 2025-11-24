const PORT = 9001;
const URLDB = "mongodb://127.0.0.1:27017";

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { secret } from "./config.js";
import User from "./models/User.js";
import Calculator from "./models/Calc.js";

const app = express();

app.use(cors());
app.use(express.json());

const generateAccessToken = (id, login) => {
  const payload = {
    id,
    login,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { login, password } = req.body;

  let user;

  try {
    user = await User.findOne({ login });
  } catch (err) {
    return res.status(500).json({ message: "Неизвестная ошибка" });
  }

  if (!user) {
    return res.status(400).json({ message: "Пользователь не найден" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Неверный логин или пароль" });
  }

  const token = generateAccessToken(user._id, user.login);

  return res.json({
    token: token,
  });
});

app.post("/calculator/add", async (req, res) => {
  try {
    const { token, calculator } = req.body;
    let user;

    try {
      user = await User.findOne(
        { login: jwt.verify(token, secret).login },
        { returnOriginal: false }
      );

      if (user === null) {
        res
          .json({
            message: "Пользователь не найден",
          })
          .status(400);
      }
    } catch (err) {
      if (err && err.code === 11000) {
        res
          .json({
            message: "Калькулятор уже существует",
          })
          .status(400);
        return;
      }
    }

    const calc = new Calculator(calculator);
    await calc.save();

    return res.json({
      message: "Калькулятор добавлен, обновите страницу для отображения",
    });
  } catch (err) {
    res
      .json({
        message: "Неизвестная ошибка.",
      })
      .status(500);

    console.error(err);

    return;
  }
});

app.post("/calculator/delete/:id", async (req, res) => {
  try {
    console.log(req.body);
    const token = req.body.token;
    const id = req.params.id;

    const user = await User.findOne(
      { login: jwt.verify(token, secret).login },
      { returnOriginal: false }
    );

    if (user === null) {
      console.log("Пользователь отсутствует в базе.");
      return res
        .json({
          message: "Пользователь не найден",
        })
        .status(400);
    }

    await Calculator.findByIdAndDelete(id);
    return res.json({
      message: "Калькулятор удален, обновите страницу для отображения",
    });
  } catch (err) {
    console.error(err);

    return res
      .json({
        message: "Неизвестная ошибка.",
      })
      .status(500);
  }
});

app.post("/calculator/edit/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { token, calculator } = req.body;
    const id = req.params.id;

    const user = await User.findOne(
      { login: jwt.verify(token, secret).login },
      { returnOriginal: false }
    );

    if (user === null) {
      console.log("Пользователь отсутствует в базе.");
      return res
        .json({
          message: "Пользователь не найден",
        })
        .status(400);
    }

    await Calculator.findByIdAndUpdate(id, calculator);
    return res.json({
      message: "Калькулятор изменен",
    });
  } catch (err) {
    console.error(err);

    return res
      .json({
        message: "Неизвестная ошибка.",
      })
      .status(500);
  }
});

app.get("/calculator/get/one/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const calc = await Calculator.findById(id);
    return res.json({ data: calc });
  } catch (err) {
    console.error(err);

    return res
      .json({
        message: "Неизвестная ошибка.",
      })
      .status(500);
  }
});

app.get("/calculator/get/all", async (req, res) => {
  try {
    const calc = await Calculator.find({});
    res.json({ data: calc });
  } catch (err) {
    console.error(err);

    return res
      .json({
        message: "Неизвестная ошибка.",
      })
      .status(500);
  }
});

const start = async () => {
  try {
    await mongoose.connect(URLDB, { authSource: "admin" });
    app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`));
  } catch (e) {
    console.log(e);
  }
};

start();
