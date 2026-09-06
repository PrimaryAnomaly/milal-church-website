/**
 * This week's 주보 (Sunday 2026-09-06).
 * Offering totals and attendance stay off the public site.
 */
export const BULLETIN = {
  date: "2026-09-06",
  sermonSeries: "복있는 사람 (10)",
  sermonTitle: "하나님이 살피시는 사람",
  preacher: "권혁진 목사",
  scripture: "시편 33:10-19",
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
      detailKo: "No. 1. 시편 1",
      detailEn: "No. 1, Psalm 1",
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
      detailKo: "김동신 집사",
      detailEn: "김동신 집사",
    },
    {
      key: "scripture",
      stand: false,
      nameKo: "성경봉독",
      nameEn: "Scripture reading",
      detailKo: "시편 33:10-19 / 조은미 집사",
      detailEn: "Psalm 33:10-19 / 조은미 집사",
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
      detailKo: "복있는 사람 (10) 「하나님이 살피시는 사람」 / 권혁진 목사",
      detailEn: "복있는 사람 (10), 하나님이 살피시는 사람 / 권혁진 목사",
    },
    {
      key: "hymn",
      stand: false,
      nameKo: "결단찬송",
      nameEn: "Hymn of response",
      detailKo: "찬송가 391장 「오 놀라운 구세주」",
      detailEn: "Hymn 391, What a wonderful Savior",
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
      date: "2026-09-13",
      prayerKo: "다같이",
      prayerEn: "All together",
      reading: "이영미",
    },
    {
      date: "2026-09-20",
      prayerKo: "박종근",
      prayerEn: "박종근",
      reading: "최은영",
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
  ],
  news: [
    {
      ko: "9월 순모임 말씀 나눔이 친교회에 있습니다.",
      en: "September cell-group Bible sharing is during the fellowship meal.",
    },
    {
      ko: "다음 주일(9월 13일)에는 교회에서 가을 바베큐가 있습니다.",
      en: "Next Sunday, September 13, there is a fall barbecue at church.",
    },
    {
      ko: "9월 금요기도회는 9월 18일(셋째 주 금요일)부터 모입니다.",
      en: "Friday prayer in September begins on the 18th, the third Friday.",
    },
  ],
  prayers: [
    {
      ko: "교육부 담당 사역자를 보내 주시기를 위해",
      en: "That God would send a worker for the education ministry.",
    },
    {
      ko: "교회의 영적 부흥과 모든 성도의 성령 충만, 다음 세대와 선교사님들을 위해. 박찬수·정은영 (케냐), 이우진·이미숙 (카자스탄)",
      en: "For the church, for every member, for the next generation, and for our missionaries: 박찬수 and 정은영 (Kenya), 이우진 and 이미숙 (Kazakhstan).",
    },
  ],
} as const;
