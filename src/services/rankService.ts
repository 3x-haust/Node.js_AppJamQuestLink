import User from '../models/userModel';

class RankService {
  async getSchoolRank() {
    try {
      return await User.aggregate([
      {
        $group: {
          _id: '$schoolName',
          totalPoints: { $sum: '$points' },
        },
      },
      {
        $sort: { totalPoints: -1 }, 
      },
      ]);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get school rank');
    }
  }

  async getUserRank(userId: number) {
    return await User.find({}, { _id: 1, points: 1 })
    .sort({ points: -1 })
    .exec();
  }
}

export default new RankService();