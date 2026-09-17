export interface PersonalInfo {
  name: string; title: string; email: string; phone: string;
  location: string; linkedin: string; github: string; portfolio: string;
}
export interface ExperienceEntry {
  id: string; company: string; title: string; location: string;
  startDate: string; endDate: string; current: boolean; bullets: string[];
}
export interface EducationEntry {
  id: string; institution: string; degree: string; field: string;
  startDate: string; endDate: string; gpa: string; honors: string;
}
export interface SkillCategory { id: string; name: string; skills: string[]; }
export interface ProjectEntry {
  id: string; name: string; description: string; technologies: string[];
  link: string; github: string; startDate: string; endDate: string;
}
export interface CertificationEntry {
  id: string; name: string; issuer: string; date: string;
  expiryDate: string; credentialId: string; url: string;
}
export interface LanguageEntry {
  id: string; name: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}
export interface AwardEntry { id: string; title: string; issuer: string; date: string; description: string; }
export interface CustomSection { id: string; title: string; entries: { id: string; text: string }[]; }
export interface CVSettings {
  template: string; font: string; fontSize: number; headingSize: number;
  lineSpacing: number; margins: number; accentColor: string;
}
export interface CVData {
  id: string; name: string; createdAt: string; updatedAt: string;
  personal: PersonalInfo; summary: string;
  experience: ExperienceEntry[]; education: EducationEntry[];
  skills: SkillCategory[]; projects: ProjectEntry[];
  certifications: CertificationEntry[]; languages: LanguageEntry[];
  awards: AwardEntry[]; customSections: CustomSection[];
  settings: CVSettings;
}
