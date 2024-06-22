import model from '../util/model';
import questService from '../services/questService';

const getGeneratedQuest = async (req: any, res: any) => {
  try {
    const time = parseInt(req.query.time as string);
    const members = parseInt(req.query.members as string);

    if (isNaN(time) || isNaN(members)) {
      return res.status(400).send({ message: 'Invalid query parameters' });
    }

    const text = await generateQuest(time, members);
    
    res.status(200).send(text);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

async function generateQuest(time: number, members: number) {
  const prompt = `
  학교 내에서 할 수 있는 퀘스트 앱 // 앱에서 퀘스트 완료를 자동 인증할 수 있도록 생성: 건강한 도파민 충전 퀘스트 제안!
  퀘스트 제목: {quest_name}
  난이도: {difficulty_stars} // 5
  인원: ${members}명 // {members}
  걸리는 시간: ${time}분 // {time}
  // 인원, 걸리는 시간 생성하지 마 정해져 있는거니까 이거대로 나머지 값 생성해
  점수: {score}점 (인원과 걸리는 시간에 따라 자동 계산)
  퀘스트 방법: {quest_description}
  퀘스트 제출 방법: {submission_method}
  꿀팁: {tip1} {tip2} {tip3}

  JSON 형식:
  {
    "quest_name": "{quest_name}",
    "difficulty_stars": {difficulty_stars},
    "members": {members},
    "time": {time},
    "score": {score},
    "quest_description": "{quest_description}",
    "submission_method": "{submission_method}",
    "tips": [
      "{tip1}",
      "{tip2}",
      "{tip3}"
    ],
  }
  // 추가퀘스트 표시하지 마 // 위의 내용은 표시하지 말고 json 형식으로만 출력해줘
  // '//'이 문자 뒤에 있는 내용은 주석이니까 출력하지 마 // 하나만 생성해
  예시:
  {
    "quest_name": "함께 운동하기 챌린지",
    "difficulty_stars": 3,
    "members": 2,
    "time": 30,
    "score": 50,
    "quest_description": "친구와 함께 30분간 운동하세요! (산책, 달리기, 자전거 타기 등)",
    "submission_method": "앱에서 운동 기록을 업로드하세요.",
    "tips": [
      "운동 전후에 충분히 스트레칭하세요.",
      "물을 많이 마셔 수분을 유지하세요.",
      "즐거운 음악을 들으며 운동하면 더욱 효과적입니다!"
    ],
  }`
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text().replace(/`|json/g, '');
  //console.log(prompt);
  //console.log(text);
  const json = JSON.parse(text);

  return json;
}

const getQuestById = async (req: any, res: any) => {
  try {
    const id = req.query.id;
    const result = await questService.getQuestById(id);
    if (!result) {
      console.log(result)
      return res.status(404).send({ message: 'Quest not found' });
    }
    res.status(200).send(result);
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Internal server error" });
  }
}

const createQuest = async (req: any, res: any) => {
  try {
    const id = req.query.id;
    const data = req.body;
    const result = await questService.createQuest(id, data);
    res.status(200).send(result);
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Internal server error" });
  }
}

const removeQuestById = async (req: any, res: any) => {
  try {
    const id = req.query.id;
    const result = await questService.removeQuestById(id);
    if (result.deletedCount === 0) {
      return res.status(404).send('Quest not found');
    }
    res.status(200).send({ message: 'Quest not found' });
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Internal server error" });
  }
}

export default { getGeneratedQuest, getQuestById, createQuest, removeQuestById };