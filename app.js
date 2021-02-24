require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const mediaRouter = require('./routes/media');
const orderPaymentRouter = require('./routes/orderPayment');
const webhookRouter = require('./routes/webhook');
const refreshTokenRouter = require('./routes/refreshTokens');

const verifyToken = require('./middleware/verifyToken');
const can = require('./middleware/permission');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/mentors', verifyToken, can('admin'), mentorsRouter);
app.use('/chapters', verifyToken, can('admin'), chaptersRouter);
app.use('/lessons', verifyToken, can('admin'), lessonsRouter);
app.use('/my-courses', verifyToken, can('admin', 'student'), myCoursesRouter);
app.use('/image-courses', verifyToken, can('admin'), imageCoursesRouter);
app.use('/reviews', verifyToken, can('admin', 'student'), reviewsRouter);
app.use('/media', verifyToken, can('admin', 'student'), mediaRouter);
app.use('/orders', verifyToken, can('admin', 'student'), orderPaymentRouter);
app.use('/webhook', webhookRouter);
app.use('/refresh-token', refreshTokenRouter);

module.exports = app;
