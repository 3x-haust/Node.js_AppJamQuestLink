import userService from '../services/userService';

const getUserById = async (req: any, res: any) => {
  try {
    const user = await userService.getUserById(req.query.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user profile' });
  }
};

const updateUser = async (req: any, res: any) => {
  try {
    const updates = req.body;
    const user = await userService.updateUser(req.query.id, updates);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error updating profile' });
  }
};

const removeUserById = async (req: any, res: any) => {
  try {
    const user = await userService.removeUserById(req.query.id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user' });
  }
}

const createUser = async (req: any, res: any) => {
  try {
    const id = req.query.id;
    const data = req.body;

    const result = await userService.createUser(id, data);
    res.status(200).send(result);
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Internal server error" });
  }
}

const addFriend = async (req: any, res: any) => {
  try {
    const userId = req.query.id;
    const friendId = req.query.friendId;

    const user = await userService.addFriend(userId, friendId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding friend' });
  }
}

const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching users' });
  }
}

const addQuestInProgress = async (req: any, res: any) => {
  try {
    const userId = req.query.id;
    const questId = req.query.questId;

    const user = await userService.addUserQuestInProgress(userId, questId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding quest in progress' });
  }
}

const addQuestCompleted = async (req: any, res: any) => {
  try {
    const userId = req.query.id;
    const questId = req.query.questId;

    const user = await userService.addCompleteUserQuest(userId, questId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding quest completed' });
  }
}


export default { getUserById, updateUser, createUser, removeUserById, getAllUsers, addQuestInProgress, addQuestCompleted, addFriend };
