/**
 * This week's 주보 (Sunday 2026-09-13).
 * Offering totals and attendance stay off the public site.
 */
export const BULLETIN = {
  date: "2026-09-13",
  sermonSeries: "복있는 사람 (11)",
  sermonTitle: "하나님이 가까이 하시는 사람",
  preacher: "권혁진 목사",
  scripture: "시편 34:15-19",
  order: [
    {
      key: "introit",
      stand: true,
      nameKo: "입례송",
      nameEn: "Introit",
      detailKo: "「하나님은 우리의 피난처」",
      detailEn: "God is our refuge",
    },
    {
      key: "responsive",
      stand: true,
      nameKo: "교독문",
      nameEn: "Responsive reading",
      detailKo: "No. 2. 시편 2편",
      detailEn: "No. 2, Psalm 2",
    },
    {
      key: "invocation",
      stand: true,
      nameKo: "기원",
      nameEn: "Invocation",
      detailKo: "인도자",
      detailEn: "Leader",
    },
    {
      key: "creed",
      stand: true,
      nameKo: "신앙고백",
      nameEn: "Confession of faith",
      detailKo: "다같이",
      detailEn: "All together",
    },
    {
      key: "praise",
      stand: false,
      nameKo: "찬양",
      nameEn: "Praise",
      detailKo: "찬양팀",
      detailEn: "Praise team",
    },
    {
      key: "prayer",
      stand: false,
      nameKo: "합심기도",
      nameEn: "Prayer",
      detailKo: "다같이",
      detailEn: "All together",
    },
    {
      key: "scripture",
      stand: false,
      nameKo: "성경봉독",
      nameEn: "Scripture reading",
      detailKo: "시편 34:15-19 / 이영미 집사",
      detailEn: "Psalm 34:15-19 / 이영미 집사",
    },
    {
      key: "offering",
      stand: true,
      nameKo: "헌금기도",
      nameEn: "Offering prayer",
      detailKo: "찬송가 1장 「만복의 근원 하나님」",
      detailEn: "Hymn 1, Praise God from whom all blessings flow",
    },
    {
      key: "sermon",
      stand: false,
      nameKo: "설교",
      nameEn: "Sermon",
      detailKo: "복있는 사람 (11) 「하나님이 가까이 하시는 사람」 / 권혁진 목사",
      detailEn: "복있는 사람 (11), 하나님이 가까이 하시는 사람 / 권혁진 목사",
    },
    {
      key: "hymn",
      stand: false,
      nameKo: "결단찬송",
      nameEn: "Hymn of response",
      detailKo: "찬송가 93장 「예수는 나의 힘이요」",
      detailEn: "Hymn 93, Jesus is my strength",
    },
    {
      key: "benediction",
      stand: true,
      nameKo: "축도",
      nameEn: "Benediction",
      detailKo: "권혁진 목사",
      detailEn: "권혁진 목사",
    },
  ],
  servers: [
    {
      date: "2026-09-20",
      prayerKo: "박종근",
      prayerEn: "박종근",
      reading: "최윤영",
    },
    {
      date: "2026-09-27",
      prayerKo: "다같이",
      prayerEn: "All together",
      reading: "정선태",
    },
    {
      date: "2026-10-04",
      prayerKo: "서영수",
      prayerEn: "서영수",
      reading: "차옥희",
    },
    {
      date: "2026-10-11",
      prayerKo: "다같이",
      prayerEn: "All together",
      reading: "유영미",
    },
  ],
  news: [
    {
      ko: "오늘은 예배 후에 가을 바베큐가 있습니다.",
      en: "There is a fall barbecue after worship today.",
    },
    {
      ko: "이번 주 금요일(9월 18일) 저녁 7시 30분에 금요기도회가 있습니다.",
      en: "The Friday prayer meeting is this Friday, September 18, at 7:30 PM.",
    },
    {
      ko: "다음 주일(9월 20일)에는 이진택 목사님(보스톤늘푸른교회)께서 설교해 주십니다.",
      en: "Next Sunday, September 20, Rev. Jintaek Lee (Boston Evergreen Church) will preach.",
    },
  ],
  prayers: [
    {
      ko: "교육부 담당 사역자를 보내 주시기를 위해",
      en: "That God would send a worker for the education ministry.",
    },
    {
      ko: "교회의 영적 부흥과 모든 성도의 성령 충만, 다음 세대와 선교사님들을 위해. 박찬수·정은영 (케냐), 이우진·이미숙 (카자스탄)",
      en: "For the spiritual revival of the church, the filling of the Holy Spirit for every member, the next generation, and our missionaries: 박찬수 and 정은영 (Kenya), 이우진 and 이미숙 (Kazakhstan).",
    },
  ],
} as const;
