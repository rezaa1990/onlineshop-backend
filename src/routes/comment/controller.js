const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');

module.exports = new (class extends controller {
  async makeComment(req, res) {
    const comment = new this.Comment({
      author:req.params.id,
      text:req.body.text,
    });
    comment.isApproved = false;
    console.log('comment',comment)
    await comment.save();
    this.response({
      res,
      message: ";نظر شما با موفقیت ساخته شد",
      data:comment,
    });
  }

  async makeReplyComment(req, res) {
    const comment = new this.Comment({
      author:req.body.author,
      text:req.body.text,
    });
    comment.isApproved = false;
    console.log('comment',comment)
    await comment.save();
    this.response({
      res,
      message: ";نظر شما با موفقیت ساخته شد",
      data:comment,
    });
  }

  async addReplyComment(req, res) {
    try {
      const comment = await this.Comment.findById(req.body.commentId);
      if (!comment) {
        return this.response({
          res,
          message: "نظر مورد نظر یافت نشد",
          data: null,
        });
      }
  
      comment.reply.push(req.body.replyCommentId);
      comment.isApproved = false;
  
      await comment.save();
      
      this.response({
        res,
        message: "نظر شما با موفقیت ریپلای شد",
        data: comment,
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در اضافه کردن پاسخ به نظر",
        data: {},
      });
    }
  }
  

  async deleteComment(req, res) {
    try {
      const deletedComment = await this.Comment.findByIdAndDelete(req.params.id);
  
      if (!deletedComment) {
        return this.response({
          res,
          message: "کامنتی با این مشخصات یافت نشد",
          data: {}
        });
      }
  
      this.response({
        res,
        message: "کامنت با موفقیت حذف شد",
        data: deletedComment
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در حذف کامنت",
        data: {}
      });
    }
  }
  
  async approveComment(req, res) {
    try {
      const updatedComment = await this.Comment.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
      );
  
      if (!updatedComment) {
        return this.response({
          res,
          message: "کامنتی با این مشخصات یافت نشد",
          data: {}
        });
      }
  
      this.response({
        res,
        message: "کامنت با موفقیت تایید شد",
        data: updatedComment
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در تایید کامنت",
        data: {}
      });
    }
  }

 
  async likeComment(req, res) {
    try {
      const comment = await this.Comment.findById(req.params.commentid);
      if (!comment) {
        return this.response({
          res,
          message: "کامنتی با این مشخصات یافت نشد",
          data: {}
        });
      }
  
      comment.likes.push(req.params.userid);
      const updatedComment = await comment.save();
  
      this.response({
        res,
        message: "کامنت با موفقیت لایک شد",
        data: updatedComment
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در لایک کردن کامنت",
        data: {}
      });
    }
  }

  async replyComment(req, res) {
    console.log(req.body.replyComment,req.params.id)
    try {
      const comment = await this.Comment.findById(req.params.id);
      if (!comment) {
        return this.response({
          res,
          message: "کامنتی با این مشخصات یافت نشد",
          data: {}
        });
      }
  
      comment.reply.push(req.body.replyComment);
      const updatedComment = await comment.save();
  
      this.response({
        res,
        message: "ریپلای با موفقیت ثبت شد",
        data: updatedComment
      });
    } catch (error) {
      this.response({
        res,
        message: "خطا در ریپلای کردن کامنت",
        data: {}
      });
    }
  }

})();