const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const mongoose = require('mongoose')
const moment = require('moment')

const getAllJobs = async (req, res) => {
  const {search, status, jobType, sort} = req.query;
  // protected route
  const queryObject = {
    createdBy: req.user.userId
  };
  console.log(queryObject.createdBy)
  if(search){
    // i is not case sensitve
    queryObject.position = {$regex: search, $options: 'i'}
  }

  // add stuff based on conditions

  if(status && status!=='all'){
    queryObject.status = status;
  }

  if(jobType && jobType!=='all'){
    queryObject.jobType = jobType
  }

  // No await

  let result = Job.find(queryObject)

  // chain sort conditions

  if(sort === 'latest'){
    result = result.sort('-createdAt')
  }
  if(sort === 'oldest'){
    result = result.sort('-createdAt')
  }
  if(sort === 'a-z'){
    result = result.sort('position')
  }
  if(sort === 'z-a'){
    result = result.sort('-position')
  }

  
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1)*limit
  
  result = result.skip(skip).limit(limit);
  
  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs/limit);

  res.status(StatusCodes.OK).send({jobs, totalJobs, numOfPages});
};

const getJob = async (req, res) => {
  console.log("Hi"+req.user)
  // take out userId from req.user
  // take out the id from req.params and put into jobId
  const {
    user: {userId},
     params:{id:jobId}
  } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId})
  // const job = await Job.findOne({_id:req.params.id, createdBy: req.user.userId})
  if(!job){
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({job});
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job});
};

const updateJob = async (req, res) => {
  const {
    user: {userId},
    params: {id:jobId},
    body: {company, position}
  } = req
  if(company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Job.findByIdAndUpdate(
    {_id: jobId, createdBy: userId},
    {company,position},// value to be updated
    {new: true, runValidators: true})
  if(!job){
    // console.log(job)
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({job})
};

const deleteJob = async (req,res) => {
  const {
    user: {userId},
    params: {id: jobId}
  } = req
  const job = await Job.findByIdAndDelete({
    _id: jobId, 
    createdBy: userId
  })
  if(!job){
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({job})
}

const showStats = async (req,res) => {
  // below aggregation will find all jobs with give job id using match
  // then group with status as a id and count for each
  let stats = await Job.aggregate([
    { $match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
    { $group:{_id: '$status', count: {$sum: 1}} }
  ])
  // acc is returning value and current is current value for object during iteration
  stats = stats.reduce ((acc,curr) => {
    const {_id:title,count}= curr
    acc[title] = count
    return acc
  },{})

  // adding default stats
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  console.log(defaultStats)

  let monthlyApplications = await Job.aggregate([
    { $match: {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
    {
      $group: {
        _id: {year: { $year: '$createdAt'}, month: {$month: '$createdAt'}},
        count: {$sum:1},
      },
    },
    { $sort: {'_id.year': -1, '_id.month': -1}},
    { $limit: 6}
  ]);
  
  monthlyApplications = monthlyApplications
  .map((item) => {
    const {_id: {year, month},count,} = item
    const date = moment().month(month-1).year(year).format('MMM Y')
    return {date,count}
  }).reverse()
  // console.log(monthlyApplications)
  res
    .status(StatusCodes.OK)
    .json({defaultStats,monthlyApplications})
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats
};
