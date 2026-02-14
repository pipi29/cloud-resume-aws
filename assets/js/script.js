// Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

// views Counter - connects to your Lambda function
        const API_URL = "https://m6axvj0b4e.execute-api.ap-northeast-1.amazonaws.com/prod/visits";

        async function getCounter() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const counterElement = document.getElementById('counter');
        
        // 👇 调试大法：看看能不能找到元素
        if (!counterElement) {
            console.error("找不到 id='counter' 的元素！请检查 HTML！");
            return;
        }

        const finalCount = data.views; 
        
        // 👇 先清空里面的 GIF
        counterElement.innerHTML = ""; 
        
        // 再显示数字
        counterElement.innerText = finalCount;
        
        console.log("成功拿到数字:", finalCount);
        
    } catch (error) {
        console.error("出错了:", error);
        const el = document.getElementById('counter');
        if (el) el.innerText = "Error"; // 出错时显示 Error
    }
}

        
// Counter animation
        function animateCounter(element, targetValue) {
            let currentValue = 0;
            const increment = Math.ceil(targetValue / 50);
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    element.innerText = targetValue.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.innerText = currentValue.toLocaleString();
                }
            }, 20);
        }
        getCounter();

// Fun facts rotation
        const funFacts = [
            "AWS has over 200 services! 🚀",
            "Lambda functions can scale from 0 to thousands instantly ⚡",
            "S3 stores trillions of objects worldwide 📦",
            "CloudFormation manages infrastructure as code 🏗️",
            "DynamoDB can handle 10 trillion requests per day 💪",
            "This website costs less than $1/month to run! 💰"
        ];
        let currentFactIndex = 0;
        
        function rotateFunFact() {
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
            const factElement = document.getElementById('funFact');
            factElement.style.opacity = '0';
            
            setTimeout(() => {
                factElement.innerText = funFacts[currentFactIndex];
                factElement.style.opacity = '1';
            }, 300);
        }

// Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });


// Remove preload class after page loads
        window.addEventListener('load', () => {
            document.body.classList.remove('is-preload');
        });

// Email copying 
function copyEmail() {
    const email = "diawpijun@gmail.com";
    
    navigator.clipboard.writeText(email).then(() => {
        const icon = document.getElementById('email-icon');
        const originalTitle = icon.title;
        
        icon.title = "copied";
        alert("copied✨"); 
        
        setTimeout(() => { icon.title = originalTitle; }, 2000);
    });
}






