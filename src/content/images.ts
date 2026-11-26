/**
 * Image registry. `placeholder: true` marks illustrative images that are NOT verified HHC
 * photographs (see docs/content-review-needed.md #24). Replace before launch.
 */
export const images = {
  hero: {
    src: "/images/placeholders/yoga-garden.jpg",
    width: 1366,
    height: 877,
    alt: "Five people in white sit on a wooden platform in a garden, practising a breathing exercise with a teacher.",
    placeholder: true,
  },
  camp: {
    src: "/images/placeholders/village-health-camp.jpg",
    width: 1600,
    height: 911,
    alt: "Illustration of a village health camp: a health worker takes a woman’s blood pressure while neighbours look on.",
    placeholder: true,
  },
  herbs: {
    src: "/images/placeholders/herbs.jpg",
    width: 1024,
    height: 1024,
    alt: "Fresh herbs, turmeric, ginger and spices around a brass mortar and pestle.",
    placeholder: true,
  },
  campPoster: {
    src: "/images/resources/ayurveda-free-camp-dec-2022.png",
    width: 1080,
    height: 1080,
    alt: "HHC poster in Gujarati for the free Ayurveda diagnosis camp on 17 and 18 December 2022 in Sola, Ahmedabad.",
    placeholder: false,
  },
  panchakarmaPoster: {
    src: "/images/resources/panchakarma-camp-dehgam-dec-2022.png",
    width: 1080,
    height: 1080,
    alt: "HHC poster in Gujarati for a seven-day residential Panchakarma camp at Dehgam, December 2022.",
    placeholder: false,
  },
  nutritionCd: {
    src: "/images/resources/nutrition-a-cd-cover.jpg",
    width: 851,
    height: 735,
    alt: "Cover of the Nutrition A educational CD, developed by Human Health Circle and Finavia, Ahmedabad.",
    placeholder: false,
  },
  lsmGu: {
    src: "/images/resources/lsm-course-gujarati.png",
    width: 1080,
    height: 1080,
    alt: "Course poster for the Gujarati Life Style Management certificate course.",
    placeholder: false,
  },
  lsmEn: {
    src: "/images/resources/lsm-course-english.png",
    width: 1080,
    height: 1080,
    alt: "Course poster for the English Life Style Management certificate course.",
    placeholder: false,
  },
} as const;
