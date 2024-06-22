import rankService from '../services/rankService';

const getSchoolRank = async (req: any, res: any) => {
  try {
    const schoolRank = await rankService.getSchoolRank();

    res.status(200).send(schoolRank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get rank' });
  }
}

const getUserRank = async (req: any, res: any) => {
  try {
    const userId = req.query.id;

    const userRank = await rankService.getUserRank(userId);

    res.status(200).send(userRank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get rank' });
  }
}

export default { getSchoolRank, getUserRank };