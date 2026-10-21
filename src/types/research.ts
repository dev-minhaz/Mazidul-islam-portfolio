export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: 'API Security' | 'Web Exploitation' | 'Methodology' | 'Defense in Depth';
  summary: string;
  tags: string[];
  content: {
    sectionHeading: string;
    paragraphs: string[];
    codeSnippet?: {
      language: string;
      code: string;
      caption: string;
    };
    keyTakeaway?: string;
  }[];
  references: string[];
}
