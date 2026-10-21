import { ResearchArticle } from '../types/research';

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    slug: 'analyzing-modern-bola-vectors',
    title: 'Analyzing Broken Object Level Authorization (BOLA) in Modern Microservices',
    date: 'March 2026',
    readTime: '6 min read',
    category: 'API Security',
    summary: 'A deep analysis of how decentralized microservice architectures fail to enforce object-level authorization when relying on gateway-level tokens.',
    tags: ['BOLA', 'API Security', 'OWASP API #1', 'Access Control', 'Microservices'],
    content: [
      {
        sectionHeading: 'The Architectural Dilemma: Gateway Trust vs. Service Enforcement',
        paragraphs: [
          'In distributed cloud environments, API gateways frequently handle initial authentication—validating JWT signatures and extracting user identities. However, vulnerabilities emerge when downstream microservices assume any traffic routed through the ingress gateway is intrinsically authorized to access whatever object ID is requested in path parameters.',
          'Broken Object Level Authorization (BOLA) remains the top vulnerability in the OWASP API Security Top 10 because automated scanners rarely understand the contextual ownership relationship between an authenticated tenant and a nested database record.',
        ],
        codeSnippet: {
          language: 'typescript',
          caption: 'Vulnerable Controller vs. Contextual Guard Pattern',
          code: `// ❌ VULNERABLE: Direct database fetch by client-provided resource ID
app.get('/api/v2/organizations/:orgId/invoices/:id', async (req, res) => {
  const invoice = await db.invoices.findById(req.params.id);
  // Missing check: does invoice.orgId === req.user.currentOrgId?
  return res.json(invoice);
});

// ✅ SECURE: Composite query binding tenant scope directly to database filter
app.get('/api/v2/organizations/:orgId/invoices/:id', authenticateToken, async (req, res) => {
  const invoice = await db.invoices.findOne({
    where: {
      id: req.params.id,
      orgId: req.user.currentOrgId // Enforces tenant boundary at storage layer
    }
  });
  if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
  return res.json(invoice);
});`,
        },
        keyTakeaway: 'Never rely on perimeter authorization alone. Every microservice must validate resource ownership against the calling context directly in storage queries.',
      },
      {
        sectionHeading: 'Detection Methodology in Authorized Penetration Testing',
        paragraphs: [
          'During penetration testing, BOLA testing cannot be fully automated with heuristic crawlers. The effective methodology requires creating at least two distinct tenant accounts with identical privileges, cataloging every CRUD endpoint accepting resource identifiers (UUIDs, sequential integers, slug names), and cross-replaying requests with swapped credentials.',
          'Care must be exercised during testing to prevent polluting production metrics or triggering unintended cross-tenant notifications.',
        ],
      },
      {
        sectionHeading: 'Defensive Architecture Recommendations',
        paragraphs: [
          'Implement Attribute-Based Access Control (ABAC) decorators at the routing controller layer. By passing authenticated user context into repository layers, developers prevent accidental omission of ownership WHERE clauses in database queries.',
        ],
      },
    ],
    references: [
      'OWASP API Security Top 10 - API1:2023 Broken Object Level Authorization',
      'NIST Special Publication 800-162: Guide to Attribute Based Access Control',
    ],
  },
  {
    slug: 'practical-idor-detection-methodology',
    title: 'Practical IDOR Detection Beyond Automated Heuristics',
    date: 'February 2026',
    readTime: '8 min read',
    category: 'Web Exploitation',
    summary: 'Why generic vulnerability scanners miss complex horizontal privilege escalation, and how methodical request tampering uncovers hidden access bypasses.',
    tags: ['IDOR', 'Web Security', 'Manual Testing', 'Burp Suite', 'Privilege Escalation'],
    content: [
      {
        sectionHeading: 'Why Vulnerability Scanners Fail on Insecure Direct Object References',
        paragraphs: [
          'Automated DAST tools excel at pattern matching: injecting quotes for SQLi, script tags for XSS, or path traversal strings. However, an IDOR looks like legitimate, well-formed business traffic—a standard integer or UUID requesting an object with valid JSON syntax.',
          'Because the request returns a 200 OK status code without any syntax errors, scanners mark it as successful without recognizing that User A just retrieved User B’s confidential tax filing.',
        ],
      },
      {
        sectionHeading: 'The Multi-Session Interception Matrix',
        paragraphs: [
          'Effective manual assessment relies on maintaining two concurrent browser sessions in Burp Suite Professional, each assigned to a separate testing role with unique session cookies. By routing traffic through authorization plugins (such as Burp Autorize) with custom extraction rules, we systematically check whether requests issued by User A succeed when executed with User B’s cookie.',
        ],
        codeSnippet: {
          language: 'http',
          caption: 'Simulated Replay Attack demonstrating IDOR parameter tampering',
          code: `POST /api/export/statement HTTP/1.1
Host: staging-banking.internal
Authorization: Bearer <USER_B_ACTIVE_TOKEN>
Content-Type: application/json

{
  "account_number": "ACC-904128",  <-- Belongs to User A!
  "statement_format": "PDF"
}

HTTP/1.1 200 OK
Content-Disposition: attachment; filename="statement_ACC-904128.pdf"
[Sensitive account statement returned across tenant boundaries]`,
        },
        keyTakeaway: 'Authorization logic is business logic. It requires human understanding of domain relationships.',
      },
      {
        sectionHeading: 'Safe Validation Without Compromising Data Integrity',
        paragraphs: [
          'In professional penetration tests, safe proof-of-concept validation requires confirming that unauthorized metadata or headers are accessible without exfiltrating or modifying client records. Testing read endpoints first and stopping immediately upon boundary confirmation guarantees zero impact on business continuity.',
        ],
      },
    ],
    references: [
      'OWASP Web Security Testing Guide (WSTG-ATHZ-04: Testing for Insecure Direct Object References)',
      'PortSwigger Web Security Academy: Access Control Vulnerabilities',
    ],
  },
  {
    slug: 'hardening-webhook-ingress-endpoints',
    title: 'Hardening Webhook Ingress Endpoints Against SSRF and Replay Attacks',
    date: 'January 2026',
    readTime: '5 min read',
    category: 'Defense in Depth',
    summary: 'Evaluating security risks in webhook receivers, including cryptographic signature verification, replay prevention, and Server-Side Request Forgery risks.',
    tags: ['Webhooks', 'SSRF', 'HMAC Verification', 'Cloud Security', 'Hardening'],
    content: [
      {
        sectionHeading: 'The Forgotten Perimeter: Public Webhook Endpoints',
        paragraphs: [
          'Modern applications integrate with payment processors, CI/CD pipelines, and third-party SaaS services via webhooks. By design, webhook receiver endpoints must be publicly accessible on the internet without session-based login credentials.',
          'This unique accessibility makes them prime targets for Server-Side Request Forgery (SSRF), unauthenticated denial-of-service, and transaction spoofing if signature verification is incomplete or permissive.',
        ],
        codeSnippet: {
          language: 'typescript',
          caption: 'Timing-Safe HMAC Signature Verification in Node.js',
          code: `import crypto from 'crypto';

export function verifyWebhookSignature(
  rawBody: Buffer,
  signatureHeader: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
  
  // Use timingSafeEqual to defeat side-channel timing attacks
  const signatureBuffer = Buffer.from(signatureHeader, 'utf8');
  const digestBuffer = Buffer.from(digest, 'utf8');
  
  if (signatureBuffer.length !== digestBuffer.length) return false;
  return crypto.timingSafeEqual(signatureBuffer, digestBuffer);
}`,
        },
        keyTakeaway: 'Always verify raw request payloads with timing-safe cryptographic comparisons before parsing JSON or executing business logic.',
      },
      {
        sectionHeading: 'Replay Protection and Timestamp Windows',
        paragraphs: [
          'Cryptographic signatures only confirm that the payload was generated by the provider; they do not guarantee that the request has not been captured and replayed by an adversary. Production webhooks must enforce a 5-minute maximum timestamp tolerance and maintain an idempotency cache of recently processed transaction IDs in memory or Redis.',
        ],
      },
    ],
    references: [
      'CWE-918: Server-Side Request Forgery (SSRF)',
      'RFC 2104: HMAC: Keyed-Hashing for Message Authentication',
    ],
  },
];
