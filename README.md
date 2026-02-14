# ☁️ Cloud Resume Challenge - AWS Serverless Website

A modern, responsive resume website built as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/), showcasing cloud engineering skills through a real-world project.

## 🎯 Project Overview

This project demonstrates proficiency in:
- **Frontend**: HTML, CSS, JavaScript
- **Cloud Infrastructure**: AWS (S3, CloudFront, Route 53, Lambda, DynamoDB, API Gateway)
- **Infrastructure as Code**: Terraform / AWS SAM
- **CI/CD**: GitHub Actions
- **Version Control**: Git & GitHub

## 🏗️ Architecture

```
┌─────────────┐
│   Route 53  │ DNS
└──────┬──────┘
       │
┌──────▼──────────┐
│   CloudFront    │ CDN (HTTPS)
└──────┬──────────┘
       │
┌──────▼──────┐
│  S3 Bucket  │ Static Website Hosting
└─────────────┘

User Browser
    │
    ├─> HTML/CSS/JS (from CloudFront/S3)
    │
    └─> API Gateway (for visitor counter)
            │
            ├─> Lambda Function (Python)
            │       │
            │       └─> DynamoDB (visitor count storage)
            │
            └─> Returns JSON response
```

## 🚀 Features

### ✨ Website Features
- **Responsive Design**: Mobile-first, works beautifully on all devices
- **Modern UI**: Smooth animations, hover effects, and interactive elements
- **Slide-out Sidebar**: Elegant navigation with smooth transitions
- **Visitor Counter**: Real-time visitor tracking using serverless architecture
- **Fun Interactive Elements**: Rotating fun facts, animated icons
- **SEO Optimized**: Proper meta tags and semantic HTML

### 🔧 Technical Features
- **Serverless Backend**: Lambda + API Gateway + DynamoDB
- **Static Website**: Hosted on S3 with CloudFront CDN
- **CI/CD Pipeline**: Automated deployment via GitHub Actions
- **Infrastructure as Code**: All infrastructure defined in code
- **HTTPS Enabled**: Secure connection via CloudFront
- **Custom Domain**: Professional domain with Route 53

## 📋 Prerequisites

Before you begin, ensure you have:

- [ ] AWS Account (with appropriate permissions)
- [ ] GitHub Account
- [ ] Domain name (optional but recommended)
- [ ] Basic knowledge of HTML/CSS/JavaScript
- [ ] AWS CLI installed
- [ ] Git installed

## 🛠️ Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/cloud-resume.git
cd cloud-resume
```

### Step 2: Customize Your Content

1. Update `index.html`:
   - Replace "Simin Chen" with your name
   - Update profile section with your bio
   - Add your skills, projects, and certifications
   - Update social media links

2. Update `main.css`:
   - Customize colors in `:root` variables
   - Adjust fonts if desired

3. Add your images to `images/` folder:
   - Hero image
   - Project screenshots
   - Profile picture (optional)

### Step 3: Set Up AWS Backend

#### Option A: Using Terraform

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

#### Option B: Using AWS SAM

```bash
cd sam
sam build
sam deploy --guided
```

#### Option C: Manual Setup (for learning)

1. **Create DynamoDB Table**:
   - Table name: `resume-visitor-counter`
   - Primary key: `id` (String)
   - On-demand billing

2. **Create Lambda Function**:
   ```python
   import json
   import boto3
   
   dynamodb = boto3.resource('dynamodb')
   table = dynamodb.Table('resume-visitor-counter')
   
   def lambda_handler(event, context):
       response = table.get_item(Key={'id': 'visitor_count'})
       
       if 'Item' in response:
           views = response['Item']['count'] + 1
       else:
           views = 1
       
       table.put_item(Item={'id': 'visitor_count', 'count': views})
       
       return {
           'statusCode': 200,
           'headers': {
               'Access-Control-Allow-Origin': '*',
               'Content-Type': 'application/json'
           },
           'body': json.dumps({'views': views})
       }
   ```

3. **Create API Gateway**:
   - REST API
   - Create a GET method
   - Enable CORS
   - Deploy to a stage (e.g., 'prod')

4. **Update `index.html`**:
   - Replace API_URL with your API Gateway endpoint

### Step 4: Set Up S3 Static Website

```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Enable static website hosting
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html

# Upload files
aws s3 sync . s3://your-bucket-name \
  --exclude ".git/*" \
  --exclude "README.md"

# Make bucket public (adjust as needed)
aws s3api put-bucket-policy \
  --bucket your-bucket-name \
  --policy file://bucket-policy.json
```

### Step 5: Set Up CloudFront

1. Create CloudFront distribution
2. Origin: Your S3 bucket
3. Enable HTTPS
4. Set custom error response (404 → index.html)
5. Wait for deployment (can take 15-20 minutes)

### Step 6: Configure Route 53 (Optional)

1. Register or transfer your domain
2. Create hosted zone
3. Add A record pointing to CloudFront
4. Add AAAA record for IPv6
5. Update nameservers if needed

### Step 7: Set Up CI/CD

1. **Add GitHub Secrets**:
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add secrets:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `CLOUDFRONT_DISTRIBUTION_ID`

2. **Update `.github/workflows/deploy.yml`**:
   - Replace `your-bucket-name` with your S3 bucket
   - Update AWS region if needed

3. **Test the workflow**:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

## 🎨 Customization Guide

### Colors
Edit CSS variables in `main.css`:
```css
:root {
    --primary-color: #916a70;      /* Main accent color */
    --primary-dark: #654a4e;       /* Darker shade */
    --accent-color: #ff85a1;       /* Secondary accent */
    --bg-cream: #f9f7f2;          /* Background */
}
```

### Fonts
Current fonts:
- **Display**: Fraunces (serif, elegant)
- **Body**: Lora (serif, readable)
- **Code**: JetBrains Mono (monospace)

To change fonts, update the Google Fonts import in `index.html` and CSS font-family values.

### Fun Facts
Edit the `funFacts` array in `index.html`:
```javascript
const funFacts = [
    "Your custom fact here! 🎉",
    "Another cool fact! ⚡",
    // Add more...
];
```

## 📊 Monitoring & Analytics

### CloudWatch Metrics
- Monitor Lambda invocations
- Track API Gateway requests
- Set up alarms for errors

### Cost Monitoring
- Enable AWS Cost Explorer
- Set up billing alerts
- Expected monthly cost: < $1 (with free tier)

## 🐛 Troubleshooting

### Visitor Counter Not Working
1. Check CORS settings on API Gateway
2. Verify Lambda function has DynamoDB permissions
3. Check browser console for errors
4. Test API endpoint directly

### CloudFront Not Updating
1. Create invalidation: `/*`
2. Wait 5-10 minutes
3. Clear browser cache
4. Try incognito mode

### GitHub Actions Failing
1. Verify AWS credentials in secrets
2. Check IAM permissions
3. Review workflow logs
4. Ensure bucket name is correct

## 📚 Resources

- [Cloud Resume Challenge](https://cloudresumechallenge.dev/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

## 🎓 What I Learned

- Deploying serverless applications on AWS
- Infrastructure as Code with Terraform
- CI/CD pipeline automation
- API development and integration
- Frontend web development
- Cloud architecture best practices

## 🚦 Future Enhancements

- [ ] Add blog section with S3 + Lambda backend
- [ ] Implement contact form with SES
- [ ] Add analytics with AWS Amplify
- [ ] Create dark mode toggle
- [ ] Add more interactive elements
- [ ] Implement A/B testing
- [ ] Add automated testing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/cloud-resume/issues).

## 👤 Author

**Simin Chen**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Simin Chen](https://linkedin.com/in/yourusername)
- Email: your.email@example.com

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">
  <p>Built with ☁️ and ❤️ for the Cloud Resume Challenge</p>
  <p>
    <a href="https://aws.amazon.com/">AWS</a> •
    <a href="https://www.terraform.io/">Terraform</a> •
    <a href="https://github.com/features/actions">GitHub Actions</a>
  </p>
</div>
