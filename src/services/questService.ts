import Quest from '../models/questModel';

class QuestService {
  async createQuest(id: number, data: object ) {
    return Quest.create({ _id: id, quest: data });
  }

  async getAllQuests() {
    return Quest.find();
  }

  async getQuestById(id: number) {
    return Quest.findById({_id: id});
  }

  async removeQuestById(id: number) {
    return Quest.deleteOne({ _id: id});
  }
}


export default new QuestService();