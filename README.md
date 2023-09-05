![Banner](/public/banner.png)

# DPHS-ADVISER

🖐️ 반가워요! 전 대평고 학생들을 위해 개발된 IOS/Android용 애플리케이션이에요 :)

## Introuduce

전 대평고등학교 학생들을 위해 급식 / 시간표 / 플래너 등등을 제공해
학생들의 스마트한 학습을 돕기 위해 만들어졌어요!

100% 오픈 소스로 관리되며,
다른 학교에서도 사용하실 수 있어요!

## How To Use It?

[플래이스토어](), [앱스토어]()에서 다운로드하실 수 있어요 :)

## How To Use It For Our School?

> Node.js가 필요합니다.

우선, 직접 앱을 수정하셔야 합니다.

[나이스 교육정보 개발 포털](https://open.neis.go.kr)에서 API키를 발급받습니다.
해당 API 키를 이용해 아래 양식으로 .env 파일을 제작합니다.

나머지 정보들은 [여기](https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=2&cateId=A0001)서 발급받으실 수 있습니다.

```env
EXPO_PUBLIC_API_KEY= '당신의 API 키'
EXPO_PUBLIC_STATECODE = '시도교육청코드'
EXPO_PUBLIC_SCHULCODE = '표준학교코드'
```

이후 아래 명령어를 실행해 줍니다.

```cmd
npm install
npm start
```

Expo Go 앱을 다운받아 실시간으로 코드를 확인하실 수 있습니다.

## Screenshots

![Main](/public/main.png)
![Meals](/public/meals.png)
![Schedules](/public/schedules.png)
