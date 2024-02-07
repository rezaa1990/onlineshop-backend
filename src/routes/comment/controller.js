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
      author:req.body.userId,
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
  try {
    console.log(req.body);
    const comment = new this.Comment({
      author: req.body.author,
      text: req.body.text,
    });
    comment.isApproved = false;
    await comment.save();

    this.response({
      res,
      message: "نظر شما با موفقیت ساخته شد",
      data: {
        author: comment.author,
        text: comment.text, // مقدار فیلد text که پاپولیت شده است
        isApproved: comment.isApproved,
        id:comment._id
      },
    });
  } catch (error) {
    console.error('Error in makeReplyComment:', error);
    this.response({
      res,
      message: "خطا",
      code: 500,
      data: {},
    });
  }
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

    await comment.save();

    const commentedProduct = await this.Product.findById(req.body.oneProductId)
    .populate({
    path: 'comments',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  })
  .populate({
    path: 'discount'
  })
  .populate({
  path: 'images',
  model: 'Image'
})
  .populate({
    path: 'comments.reply',
    options: { sort: { createdAt: -1 } },
    populate: [
      { path: 'author', model: 'User' },
      { path: 'likes', model: 'User' },
      { path: 'reply', model: 'Comment', populate: [
        { path: 'author', model: 'User' },
        { path: 'likes', model: 'User' },
      ]}
    ]
  });

    this.response({
      res,
      message: "نظر شما با موفقیت ریپلای شد",
      data: { "comment": comment, "oneProduct": commentedProduct }
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
  let oneProduct; // تعریف متغیر
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

    oneProduct = await this.Product.findById(req.body.oneProductId)
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: 'author', model: 'User' },
          { path: 'likes', model: 'User' },
          {
            path: 'reply', model: 'Comment', populate: [
              { path: 'author', model: 'User' },
              { path: 'likes', model: 'User' },
            ]
          }
        ]
      })
      .populate({
        path: 'discount'
      })
.populate({
  path: 'images',
  model: 'Image'
})
      .populate({
        path: 'comments.reply',
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: 'author', model: 'User' },
          { path: 'likes', model: 'User' },
          {
            path: 'reply', model: 'Comment', populate: [
              { path: 'author', model: 'User' },
              { path: 'likes', model: 'User' },
            ]
          }
        ]
      })
    console.group("002",oneProduct)
    this.response({
      res,
      message: "کامنت با موفقیت لایک شد",
      data: {"likededProduct": oneProduct }
    });
  } catch (error) {
    this.response({
      res,
      message: "خطا در لایک کردن کامنت",
      data: { "updatedComment": {}, "likededProduct":{} } // استفاده از یک مقدار پیش‌فرض
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