export interface Environment {
  production: boolean;
  siteUrl: string;
  /** Optional form-backend endpoint (e.g. Formspree/Getform). When empty the contact form opens the visitor's email client. */
  contactEndpoint: string;
}
