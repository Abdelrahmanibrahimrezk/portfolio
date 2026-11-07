export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  caption: string;
};

export const awardVideo = {
  src: "/achievements/genai-award-ceremony.mp4",
  poster: "/achievements/genai-award-ceremony-poster.jpg",
  width: 576,
  height: 1024,
  title: "On stage: Gen AI Speech Analytics award",
  description:
    "Recognized on stage at a Vodafone Egypt recognition ceremony for the Gen AI Speech Analytics platform. The slide behind the stage lists the project and the team members being honored.",
};

export const recognition: GalleryImage[] = [
  {
    src: "/achievements/vodafone-genai-speech-analytics-certificate.jpg",
    alt: "Vodafone Recognition Certificate awarded to Abdelrahman Rizk, thanking him for his crucial role in the development of Gen AI Speech Analytics, signed by the Consumer Business Unit Director.",
    width: 1280,
    height: 960,
    title: "Gen AI Speech Analytics — Recognition Certificate",
    caption:
      "“Your dedication & commitment played a crucial role in the development of Gen AI Speech Analytics.” — Consumer Business Unit Director, Vodafone Egypt",
  },
  {
    src: "/achievements/vodafone-outstanding-contribution-certificate.jpg",
    alt: "Vodafone Recognition Certificate awarded to Abdelrahman Abdelrehim in recognition of outstanding contribution and achievement, signed by the Head of CVM, Data Science & AI.",
    width: 1600,
    height: 900,
    title: "Outstanding Contribution & Achievement",
    caption: "Vodafone Recognition Certificate — Head of CVM, Data Science & AI, Vodafone Egypt",
  },
  {
    src: "/achievements/recognition-ceremony.jpg",
    alt: "Abdelrahman holding a Vodafone recognition certificate next to a manager at the recognition ceremony.",
    width: 960,
    height: 1280,
    title: "Recognition ceremony",
    caption: "Receiving the Outstanding Contribution & Achievement certificate.",
  },
];

export const credentials: GalleryImage[] = [
  {
    src: "/achievements/aws-ml-specialty.jpg",
    alt: "AWS credential verification page for AWS Certified Machine Learning – Specialty, active since January 3, 2022.",
    width: 736,
    height: 1600,
    title: "AWS Certified Machine Learning – Specialty",
    caption: "Earned January 2022 · three-year validity (through January 2025). Verified on CertMetrics.",
  },
  {
    src: "/achievements/udacity-advanced-data-analysis.jpg",
    alt: "Udacity verified certificate of completion for the Advanced Data Analysis Nanodegree, May 7 2022, scholarship sponsored by Egypt's Ministry of Communications and Information Technology.",
    width: 1206,
    height: 837,
    title: "Advanced Data Analysis Nanodegree",
    caption: "Udacity · May 2022 · Scholarship by Egypt's Ministry of Communications & IT (FWD program).",
  },
  {
    src: "/achievements/iti-ai-diploma-transcript.jpg",
    alt: "Information Technology Institute transcript for the Artificial Intelligence Program diploma, April to December 2021, with an overall grade of A over 1,500 hours.",
    width: 918,
    height: 1280,
    title: "ITI Diploma — Artificial Intelligence Program",
    caption:
      "Information Technology Institute · Apr – Dec 2021 · 1,500 hours, overall grade A. Graduation project: real-time PPE detection.",
  },
];

/** Summarized from the Upwork contract history (client names and budgets intentionally omitted). */
export const freelance = {
  profileUrl: "https://www.upwork.com/freelancers/abdelrahmanibrahim13",
  stats: [
    { value: "40", label: "contracts" },
    { value: "25", label: "five-star reviews" },
    { value: "4.9", label: "avg. rating (29 rated)" },
    { value: "2021–24", label: "active years" },
  ],
  highlights: [
    "VGG16 binary image classification",
    "Object detection with CNNs",
    "Violence detection with deep learning",
    "Computer vision + Streamlit app",
    "NLP keyword matcher (TF-IDF / BoW)",
    "Apache Spark ML model building",
    "XGBoost & linear regression models",
    "Ensemble techniques in Python",
    "K-fold cross-validation pipelines",
    "Goal attainment prediction",
    "Predictive modeling in Python",
    "Logistic regression user application",
    "Streamlit data visualization",
    "Plotly choropleth dashboards",
    "Kaggle dataset visualizations",
  ],
};
