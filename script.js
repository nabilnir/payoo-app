// Login function
document.getElementById("login-btn").addEventListener('click', function (event) {
    event.preventDefault();
    const number = 8801976866745;
    const pin = 9190;
    const phnNumVlu = document.getElementById("phn-num").value;
    const phnNumVluCvt = parseInt(phnNumVlu);
    const pinNumVlu = document.getElementById("pin-num").value;
    const pinNumVluCvt = parseInt(pinNumVlu);

    // Input validation
    const phoneInput = document.getElementById("phn-num");
    const pinInput = document.getElementById("pin-num");
    let isValid = true;
    
    if (!/^\d{13}$/.test(phnNumVlu)) {
        phoneInput.classList.add('border', 'border-red-500');
        isValid = false;
    } else {
        phoneInput.classList.remove('border', 'border-red-500');
    }
    
    if (!/^\d{4}$/.test(pinNumVlu)) {
        pinInput.classList.add('border', 'border-red-500');
        isValid = false;
    } else {
        pinInput.classList.remove('border', 'border-red-500');
    }
    
    if (!isValid) {
        alert('Please check your inputs. Phone must be 13 digits and PIN must be 4 digits.');
        return;
    }

    if (phnNumVluCvt === number && pinNumVluCvt === pin) {
        window.location.href = "./home.html";
    } else {
        alert('Invalid Credentials!');
    }
});

// Real-time validation
document.getElementById("phn-num").addEventListener('input', function() {
    if (this.value.length === 13 && /^\d+$/.test(this.value)) {
        this.classList.remove('border', 'border-red-500');
    } else {
        this.classList.add('border', 'border-red-500');
    }
});

document.getElementById("pin-num").addEventListener('input', function() {
    if (this.value.length === 4 && /^\d+$/.test(this.value)) {
        this.classList.remove('border', 'border-red-500');
    } else {
        this.classList.add('border', 'border-red-500');
    }
});