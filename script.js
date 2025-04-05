document.addEventListener('DOMContentLoaded', () => {
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');

    const nextBtn = document.getElementById('nextBtn');
    const makeNowBtn = document.getElementById('makeNowBtn');
    const generateBtn = document.getElementById('generateBtn');
    const backToStartBtn = document.getElementById('backToStartBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const backToGeneratorBtn = document.getElementById('backToGeneratorBtn');
    const contactBtn = document.getElementById('contactBtn');
    const contactDetails = document.getElementById('contactDetails');

    const qrTypeSelect = document.getElementById('qrType');
    const inputContainer = document.getElementById('inputContainer');
    const qrcodeDiv = document.getElementById('qrcode');

    const websiteInput = document.getElementById('websiteInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const whatsappInput = document.getElementById('whatsappInput');
    const addressInput = document.getElementById('addressInput');
    const tiktokInput = document.getElementById('tiktokInput');
    const facebookInput = document.getElementById('facebookInput');
    const instagramInput = document.getElementById('instagramInput');
    const youtubeInput = document.getElementById('youtubeInput');

    const qrColorInput = document.getElementById('qrColorInput');
    const qrBgColorInput = document.getElementById('qrBgColorInput');

    const allInputFields = [
        websiteInput, emailInput, phoneInput, whatsappInput, addressInput,
        tiktokInput, facebookInput, instagramInput, youtubeInput
    ];
    const allPages = [page1, page2, page3, page4];

    page1.classList.add('active');
    allPages.forEach(p => {
        if (!p.classList.contains('active')) {
            p.style.display = 'flex';
            p.style.opacity = '0';
        }
    });
    setTimeout(() => {
        allPages.forEach(p => {
            if (!p.classList.contains('active')) {
                p.style.display = 'none';
            }
        });
    }, 10);


    function showPage(pageToShow) {
        allPages.forEach(page => {
            if(page !== pageToShow) {
                page.classList.remove('active');
                page.style.opacity = '0';
                 if(page === page3 && aboutBtn) {
                     aboutBtn.style.display = 'none';
                 }
                 setTimeout(() => {
                    if (!page.classList.contains('active')) {
                        page.style.display = 'none';
                    }
                }, 800);
            }
        });

        pageToShow.style.display = 'flex';
        pageToShow.offsetHeight;
        pageToShow.classList.add('active');
        pageToShow.style.opacity = '1';

        if (pageToShow === page3 && aboutBtn) {
            aboutBtn.style.display = 'inline-block'; // Always show on page 3
        }

        const animatedText = pageToShow.querySelector('.animated-text');
        const animatedButton = pageToShow.querySelector('.slide-in');
        const generatorContainer = pageToShow.querySelector('.generator-container');

        if (animatedText) {
            animatedText.style.animation = 'none';
            animatedText.offsetHeight;
            animatedText.style.animation = '';
        }
        if (animatedButton) {
             animatedButton.style.animation = 'none';
             animatedButton.offsetHeight;
             animatedButton.style.animation = '';
        }
        if (pageToShow === page3 && generatorContainer) {
             generatorContainer.style.animation = 'none';
             generatorContainer.offsetHeight;
             generatorContainer.style.animation = '';
        }
        if (pageToShow !== page4 && contactDetails) {
             contactDetails.style.display = 'none';
        }
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showPage(page2));
    if (makeNowBtn) makeNowBtn.addEventListener('click', () => {
        showPage(page3);
        updateInputFields();
        clearQRCode();
    });

    if (aboutBtn) {
        aboutBtn.addEventListener('click', () => showPage(page4));
    }
    if (backToGeneratorBtn) {
        backToGeneratorBtn.addEventListener('click', () => showPage(page3));
    }
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            if (contactDetails) {
                contactDetails.style.display = contactDetails.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    if (backToStartBtn) {
        backToStartBtn.addEventListener('click', () => {
            showPage(page1);
            clearQRCode();
        });
    }

    function updateInputFields() {
        const selectedType = qrTypeSelect.value;
        allInputFields.forEach(input => input.style.display = 'none');

        switch (selectedType) {
            case 'website': websiteInput.style.display = 'block'; break;
            case 'email': emailInput.style.display = 'block'; break;
            case 'phone': phoneInput.style.display = 'block'; break;
            case 'whatsapp': whatsappInput.style.display = 'block'; break;
            case 'address': addressInput.style.display = 'block'; break;
            case 'tiktok': tiktokInput.style.display = 'block'; break;
            case 'facebook': facebookInput.style.display = 'block'; break;
            case 'instagram': instagramInput.style.display = 'block'; break;
            case 'youtube': youtubeInput.style.display = 'block'; break;
        }
        clearQRCode();
    }

    if (qrTypeSelect) {
        qrTypeSelect.addEventListener('change', updateInputFields);
        updateInputFields();
    }

    function clearQRCode() {
        qrcodeDiv.innerHTML = '<p>Your QR code will appear here.</p>';
        qrcodeDiv.classList.remove('has-code');
        qrcodeDiv.style.backgroundColor = '';
        if(downloadBtn) downloadBtn.style.display = 'none';
        if(backToStartBtn) backToStartBtn.style.display = 'none';
        // Keep About button visibility managed by showPage
        if (page3.classList.contains('active') && aboutBtn) {
             aboutBtn.style.display = 'inline-block';
        } else if (aboutBtn) {
            // Hide if not on page 3 (covers clearing from other states)
             aboutBtn.style.display = 'none';
        }
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const type = qrTypeSelect.value;
            let data = '';
            let currentInput = null;
            let inputValue = '';

            switch (type) {
                case 'website': currentInput = websiteInput; break;
                case 'email': currentInput = emailInput; break;
                case 'phone': currentInput = phoneInput; break;
                case 'whatsapp': currentInput = whatsappInput; break;
                case 'address': currentInput = addressInput; break;
                case 'tiktok': currentInput = tiktokInput; break;
                case 'facebook': currentInput = facebookInput; break;
                case 'instagram': currentInput = instagramInput; break;
                case 'youtube': currentInput = youtubeInput; break;
            }

            if (currentInput) {
                inputValue = currentInput.value.trim();
            }

            switch (type) {
                case 'website':
                    if (inputValue && !inputValue.startsWith('http://') && !inputValue.startsWith('https://')) {
                        data = 'https://' + inputValue;
                    } else { data = inputValue; }
                    break;
                case 'email':
                    if (inputValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
                         data = 'mailto:' + inputValue;
                    } else if (inputValue) { alert('Please enter a valid email address.'); data = ''; }
                    break;
                case 'phone':
                    data = inputValue.replace(/[^0-9+]/g, '');
                    if (data) data = 'tel:' + data;
                    break;
                case 'whatsapp':
                    let number = inputValue.replace(/[^0-9]/g, '');
                    if (number) { data = `https://wa.me/${number}`; }
                    else if(inputValue){ alert('Please enter a valid WhatsApp number (digits only, include country code).'); data = ''; }
                    break;
                case 'address': data = inputValue; break;
                case 'tiktok':
                    let tiktokUser = inputValue.replace(/^@/, '');
                    if (tiktokUser) { data = `https://www.tiktok.com/@${tiktokUser}`; }
                    else if (inputValue) { alert('Please enter a valid TikTok username.'); data = ''; }
                    break;
                case 'facebook':
                    if (inputValue && (inputValue.includes('facebook.com') || inputValue.includes('fb.com'))) {
                        if (!inputValue.startsWith('http://') && !inputValue.startsWith('https://')) { data = 'https://' + inputValue; }
                        else { data = inputValue; }
                    } else if (inputValue) { alert('Please enter a valid Facebook Profile or Page URL.'); data = ''; }
                    break;
                case 'instagram':
                    let instaUser = inputValue.replace(/^@/, '');
                     if (instaUser) { data = `https://www.instagram.com/${instaUser}`; }
                     else if (inputValue) { alert('Please enter a valid Instagram username.'); data = ''; }
                    break;
                case 'youtube':
                    if (inputValue && inputValue.includes('youtube.com')) {
                         if (!inputValue.startsWith('http://') && !inputValue.startsWith('https://')) { data = 'https://' + inputValue; }
                         else { data = inputValue; }
                    } else if (inputValue) { alert('Please enter a valid YouTube Channel URL.'); data = ''; }
                    break;
                default: data = inputValue;
            }

            if (!data) {
                 let typeName = qrTypeSelect.options[qrTypeSelect.selectedIndex].text;
                 if (inputValue === '' && type !== 'email' && type !== 'tiktok' && type !== 'facebook' && type !== 'instagram' && type !== 'youtube' && type !== 'whatsapp') {
                     alert(`Please enter a value for ${typeName}.`);
                     if(currentInput) currentInput.focus();
                 } else if (inputValue !== '' && data === '') { /* Alert already shown */ }
                 else if (inputValue === '') {
                     alert(`Please enter a value for ${typeName}.`);
                     if(currentInput) currentInput.focus();
                 }
                 if(downloadBtn) downloadBtn.style.display = 'none';
                 if(backToStartBtn) backToStartBtn.style.display = 'none';
                 if(aboutBtn) aboutBtn.style.display = 'inline-block'; // Keep About visible
                return;
            }

            const qrColor = qrColorInput.value;
            const qrBgColor = qrBgColorInput.value;

            qrcodeDiv.innerHTML = '';

            try {
                new QRCode(qrcodeDiv, {
                    text: data,
                    width: 300,
                    height: 300,
                    colorDark: qrColor,
                    colorLight: qrBgColor,
                    correctLevel: QRCode.CorrectLevel.H
                });
                qrcodeDiv.classList.add('has-code');
                qrcodeDiv.style.backgroundColor = qrBgColor;
                if(aboutBtn) aboutBtn.style.display = 'inline-block';
                if(downloadBtn) downloadBtn.style.display = 'inline-block';
                if(backToStartBtn) backToStartBtn.style.display = 'inline-block';

            } catch (error) {
                console.error("QR Code generation failed:", error);
                qrcodeDiv.innerHTML = '<p style="color: red;">Could not generate QR code. Please check your input.</p>';
                qrcodeDiv.classList.remove('has-code');
                qrcodeDiv.style.backgroundColor = '';
                 if(downloadBtn) downloadBtn.style.display = 'none';
                 if(backToStartBtn) backToStartBtn.style.display = 'none';
                 if(aboutBtn) aboutBtn.style.display = 'inline-block';
            }
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const canvas = qrcodeDiv.querySelector('canvas');

             if (canvas) {
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                const qrBgColor = qrBgColorInput.value || '#ffffff';
                const computedStyle = window.getComputedStyle(qrcodeDiv);
                const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
                const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;
                const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
                const paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;

                tempCanvas.width = canvas.width + paddingLeft + paddingRight;
                tempCanvas.height = canvas.height + paddingTop + paddingBottom;

                tempCtx.fillStyle = qrBgColor;
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                tempCtx.drawImage(canvas, paddingLeft, paddingTop);

                const dataUrl = tempCanvas.toDataURL('image/png');
                triggerDownload(dataUrl, 'qrcode_with_background.png');

            } else {
                alert('Could not find QR code image element to download.');
                console.error("QR Code download failed: Canvas not found in container.");
            }
        });
    }

    function triggerDownload(dataUrl, filename) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

});