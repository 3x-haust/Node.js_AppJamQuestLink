import User from '../models/userModel';
import mongoose from 'mongoose';

class UserService {
  async createUser(id: number, data: string) {
    try {
      const userData = JSON.parse(JSON.stringify(data));

      return User.create({ 
        _id: id, 
        username: userData.username,
        email: userData.email, 
        code: userData.code, 
        image: userData.image, 
        schoolName: userData.schoolName, 
        points: userData.points, 
        questsInProgress: userData.questsInProgress, 
        questsCompleted: userData.questsCompleted,
        friends: userData.friends
      });
    } catch (error) {
        console.error(error);
        return { message: 'Invalid JSON data' };
    }
  }

  async getUserById(id: number) {
    return User.findById(id).exec();
  }

  async updateUser(id: number, data: object) {
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async removeUserById(id: number) {
    return User.findByIdAndDelete(id).exec();
  }

  async getAllUsers() {
    return User.find().exec();
  }

  async addUserQuestInProgress(userId: number, questId: number) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { questsInProgress: questId } },
      { new: true }
    ).exec();
  }

  async addCompleteUserQuest(userId: number, questId: number) {
    return User.findByIdAndUpdate(
      userId,
      { 
        $pull: { questsInProgress: questId }, 
        $addToSet: { questsCompleted: questId }
      },
      { new: true }
    ).exec();
  }

  async addFriend(userId: number, friendId: number) {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    ).exec();
  }
}

export default new UserService();
