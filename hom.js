document.addEventListener('DOMContentLoaded', function () {
    // Section references
    const sections = {
        latestActivity: document.getElementById('latest-activity'),
        addMoney: document.getElementById('add-money-section'),
        cashout: document.getElementById('cashout-section'),
        paybill: document.getElementById('paybill-section'),
        bonus: document.getElementById('bonus-section'),
        transfer: document.getElementById('transfer-section')
    };

    // Toggle buttons
    const toggles = {
        addMoney: document.getElementById('add-money-toggle'),
        cashout: document.getElementById('cashout-toggle'),
        paybill: document.getElementById('paybill-toggle'),
        bonus: document.getElementById('bonus-toggle'),
        transfer: document.getElementById('transfer-toggle'),
        transaction: document.getElementById('transaction-toggle')
    };

    // Close buttons
    const closeButtons = {
        addMoney: document.getElementById('close-add-money'),
        cashout: document.getElementById('close-cashout'),
        paybill: document.getElementById('close-paybill'),
        bonus: document.getElementById('close-bonus'),
        transfer: document.getElementById('close-transfer')
    };

    // Helper to hide all sections
    function hideAllSections() {
        Object.values(sections).forEach(section => {
            section.classList.remove('active');
        });
    }

    // Helper to set active button style
    function setActiveBtn(activeBtn) {
        Object.values(toggles).forEach(btn => btn.classList.remove('active-btn'));
        if (activeBtn) {
            activeBtn.classList.add('active-btn');
        }
    }

    // Show section helper
    function showSection(section) {
        hideAllSections();
        section.classList.add('active');
    }

    // Set initial state - show only latest activity and set its button as active
    hideAllSections();
    sections.latestActivity.classList.add('active');
    setActiveBtn(toggles.transaction);

    // Common handler for toggles
    function handleToggle(toggleKey, sectionKey) {
        toggles[toggleKey].addEventListener('click', () => {
            setActiveBtn(toggles[toggleKey]);
            showSection(sections[sectionKey]);
        });
    }

    // Attach handlers
    handleToggle('addMoney', 'addMoney');
    handleToggle('cashout', 'cashout');
    handleToggle('transfer', 'transfer');
    handleToggle('bonus', 'bonus');
    handleToggle('paybill', 'paybill');
    handleToggle('transaction', 'latestActivity');

    // Close button listeners
    Object.values(closeButtons).forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                showSection(sections.latestActivity);
                setActiveBtn(toggles.transaction);
            });
        }
    });

    // --- Add Money Logic ---
    const avlBlnc = document.getElementById("av-blnc");
    const addMoneyForm = sections.addMoney.querySelector('form');
    const bankSelect = document.getElementById('bank-select');
    const accountNumber = document.getElementById('account-number');
    const addAmount = document.getElementById('add-amount');
    const pinNum = document.getElementById('pin-num');

    if (addMoneyForm) {
        addMoneyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let errors = [];
            if (!bankSelect.value || bankSelect.value === "Select bank") errors.push("Please select a bank.");
            if (!/^\d{11}$/.test(accountNumber.value.trim())) errors.push("Bank account number must be exactly 11 digits.");
            if (!addAmount.value || isNaN(addAmount.value) || Number(addAmount.value) <= 0) errors.push("Please enter a valid amount greater than 0.");
            if (!/^\d{4}$/.test(pinNum.value.trim())) errors.push("Pin number must be exactly 4 digits.");

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            avlBlnc.innerText = currentBalance + Number(addAmount.value);

            alert("Money added successfully!");
            addMoneyForm.reset();
            showSection(sections.latestActivity);
            setActiveBtn(toggles.transaction);
        });
    }

    // --- Cash Out Logic ---
    const cashoutForm = sections.cashout.querySelector('form');
    const agentNumber = document.getElementById('agent-number');
    const cashoutAmount = document.getElementById('cashout-amount');
    const cashoutPin = document.getElementById('cashout-pin');

    if (cashoutForm) {
        cashoutForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let errors = [];
            if (!/^\d{11}$/.test(agentNumber.value.trim())) errors.push("Agent number must be exactly 11 digits.");
            if (!cashoutAmount.value || isNaN(cashoutAmount.value) || Number(cashoutAmount.value) <= 0) errors.push("Please enter a valid amount greater than 0.");
            if (!/^\d{4}$/.test(cashoutPin.value.trim())) errors.push("Pin number must be exactly 4 digits.");

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            if (Number(cashoutAmount.value) > currentBalance) errors.push("Insufficient balance.");

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            avlBlnc.innerText = currentBalance - Number(cashoutAmount.value);

            alert("Cash out successful!");
            cashoutForm.reset();
            showSection(sections.latestActivity);
            setActiveBtn(toggles.transaction);
        });
    }

    // --- Pay Bill Logic ---
    const paybillForm = sections.paybill.querySelector('form');
    const paybillBank = document.getElementById('paybill-bank');
    const billerAccount = document.getElementById('biller-account');
    const paybillAmount = document.getElementById('paybill-amount');
    const paybillPin = document.getElementById('paybill-pin');

    if (paybillForm) {
        paybillForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let errors = [];
            if (!paybillBank.value || paybillBank.value === "Select bank") errors.push("Please select a biller.");
            if (!billerAccount.value.trim()) errors.push("Enter biller account number.");
            if (!paybillAmount.value || isNaN(paybillAmount.value) || Number(paybillAmount.value) <= 0) errors.push("Enter a valid amount.");
            if (!/^\d{4}$/.test(paybillPin.value.trim())) errors.push("Pin must be 4 digits.");

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            if (Number(paybillAmount.value) > currentBalance) errors.push("Insufficient balance.");

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            avlBlnc.innerText = currentBalance - Number(paybillAmount.value);
            alert("Bill paid successfully!");
            paybillForm.reset();
            showSection(sections.latestActivity);
            setActiveBtn(toggles.transaction);
        });
    }

    // --- Bonus Logic ---
    const bonusForm = sections.bonus.querySelector('form');
    const bonusCoupon = document.getElementById('bonus-coupon');
    
    if (bonusForm) {
        bonusForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!bonusCoupon.value.trim()) return alert("Enter your coupon.");
            // Example: Add 100 as bonus
            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            avlBlnc.innerText = currentBalance + 100;
            alert("Bonus added!");
            bonusForm.reset();
            showSection(sections.latestActivity);
            setActiveBtn(toggles.transaction);
        });
    }

    // --- Transfer Money Logic ---
    const transferForm = sections.transfer.querySelector('form');
    const transferAccount = document.getElementById('transfer-account');
    const transferAmount = document.getElementById('transfer-amount');
    const transferPin = document.getElementById('transfer-pin');
    
    if (transferForm) {
        transferForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let errors = [];
            if (!/^\d{11}$/.test(transferAccount.value.trim())) errors.push("User account must be 11 digits.");
            if (!transferAmount.value || isNaN(transferAmount.value) || Number(transferAmount.value) <= 0) errors.push("Enter a valid amount.");
            if (!/^\d{4}$/.test(transferPin.value.trim())) errors.push("Pin must be 4 digits.");

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            if (Number(transferAmount.value) > currentBalance) errors.push("Insufficient balance.");

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            avlBlnc.innerText = currentBalance - Number(transferAmount.value);
            alert("Money transferred!");
            transferForm.reset();
            showSection(sections.latestActivity);
            setActiveBtn(toggles.transaction);
        });
    }
});