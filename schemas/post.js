// schemas/todo.schema.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  // userId: { // 굳이 필요 없을 듯 _id를 userId로 할거니까 아래에서
  //   type: String,
  //   required: true,
  // },
  pw: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
}, { versionKey: false } // _v필드 생성x
);

// 프론트엔드 서빙을 위한 코드이다. 현재는 신경 ㄴㄴ
postSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});
postSchema.set('toJSON', {
  virtuals: true,
});


export default mongoose.model('Post', postSchema);