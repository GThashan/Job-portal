import Jobmodel from "../models/Jobmodel.js";
import mongoose from "mongoose";

export const createjobController = async(req,res,next)=>{
    const {company, position} = req.body;

    if(!company || !position){
        return next("please provide all feilds")
    }

    req.body.createdby = req.user.userId;
    const job = await Jobmodel.create(req.body);
   
    res.status(201).json({job});

}


export const getalljobController = async(req,res,next)=>{
    const job = await Jobmodel.find({createdby:req.user.userId});
    res.status(201).json({
        totaljob:job.length,
        job
    })
}


export const updatejobController = async(req,res,next)=>{
    const {id} = req.params;
    const {company, position} = req.body;
    if(!company || !position){
        return next("please provide all feilds")
    }
  
    const job = await Jobmodel.findOne({_id:id});
    if(!job){
        next("There are no jobs you  post like this")
    }

    if(req.user.userId === Jobmodel.createdby.toString()){
        return next("You are not authorize person to update this job")
    }

    const updatejob = await Jobmodel.findByIdAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true
    })

    res.status(201).json({updatejob})

}


export const deletejobController = async(req,res,next)=>{
    const {id} = req.params;

    const job = await Jobmodel.findOne({_id:id});
    if(!job){
        next("job is not found");
    }

    if(req.user.userId === Jobmodel.createdby.toString()){
        return next("You are not authorize person to delete this job")
    }

    await job.deleteOne();
    res.status(201).json({message:"delete job succefully"});
}


export const jobstateController = async(req,res)=>{
    const stats = await jobsModel.aggregate([
        // search by user jobs
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(req.user.userId),
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
    
      //default stats
      const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0,
      };
    
      //monthly yearly stats
      let monthlyApplication = await jobsModel.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(req.user.userId),
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: {
              $sum: 1,
            },
          },
        },
      ]);
      monthlyApplication = monthlyApplication
        .map((item) => {
          const {
            _id: { year, month },
            count,
          } = item;
          const date = moment()
            .month(month - 1)
            .year(year)
            .format("MMM Y");
          return { date, count };
        })
        .reverse();
      res
        .status(200)
        .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
    };