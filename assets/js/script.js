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


const API_URL = "https://m6axvj0b4e.execute-api.ap-northeast-1.amazonaws.com/prod/visits";
const counterEl = document.getElementById('counter');
const catIcon = document.getElementById('loading-icon');

const animate = (el, target) => {
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.innerText = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.innerText = current.toLocaleString();
        }
    }, 20);
};

const getCounter = async () => {
    if (!counterEl) return;
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error();
        const { views } = await res.json();
        animate(counterEl, parseInt(views));
        if (catIcon) catIcon.src = "images/gotit!.gif";
    } catch (e) {
        counterEl.innerText = "Error";
        if (catIcon) catIcon.src = "images/error.gif";
    }
};

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


// copy email
let activeCopyBadge = null;

function showCopyBadge(target) {
    if (!target) return;

    if (activeCopyBadge) {
        activeCopyBadge.remove();
        activeCopyBadge = null;
    }

    const badge = document.createElement('span');
    badge.className = 'copy-badge';
    badge.textContent = 'Copied';
    target.appendChild(badge);
    activeCopyBadge = badge;

    const cleanup = () => {
        if (!badge.isConnected) return;
        badge.remove();
        if (activeCopyBadge === badge) {
            activeCopyBadge = null;
        }
    };

    badge.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, 1700);
}

function copyEmail(triggerElement) {
    const email = "diawpijun@gmail.com";
    const target = triggerElement instanceof Element
        ? triggerElement
        : document.getElementById('email-container');
    const handleCopy = () => showCopyBadge(target);

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(handleCopy);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        handleCopy();
    }
}
