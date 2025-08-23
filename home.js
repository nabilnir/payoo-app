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

    // Show section helper
    function showSection(section) {
        hideAllSections();
        section.classList.add('active');
    }

    // Toggle listeners
    toggles.addMoney.addEventListener('click', () => showSection(sections.addMoney));
    toggles.cashout.addEventListener('click', () => showSection(sections.cashout));
    toggles.transfer.addEventListener('click', () => showSection(sections.transfer));
    toggles.bonus.addEventListener('click', () => showSection(sections.bonus));
    toggles.paybill.addEventListener('click', () => showSection(sections.paybill));
    toggles.transaction.addEventListener('click', () => showSection(sections.latestActivity));

    // Close button listeners
    closeButtons.addMoney.addEventListener('click', () => showSection(sections.latestActivity));
    closeButtons.cashout.addEventListener('click', () => showSection(sections.latestActivity));
    closeButtons.paybill.addEventListener('click', () => showSection(sections.latestActivity));
    closeButtons.bonus.addEventListener('click', () => showSection(sections.latestActivity));
    closeButtons.transfer.addEventListener('click', () => showSection(sections.latestActivity));

    // --- Add Money Logic ---
    const avlBlnc = document.getElementById("av-blnc");
    const addMoneyForm = sections.addMoney.querySelector('form');
    const bankSelect = document.getElementById('bank-select');
    const accountNumber = document.getElementById('account-number');
    const addAmount = document.getElementById('add-amount');
    const pinNum = document.getElementById('pin-num');

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
    });

    // --- Cash Out Logic ---
    const cashoutForm = sections.cashout.querySelector('form');
    const agentNumber = document.getElementById('agent-number');
    const cashoutAmount = document.getElementById('cashout-amount');
    const cashoutPin = document.getElementById('cashout-pin');

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
    });

    // --- Pay Bill Logic ---
    const paybillForm = sections.paybill.querySelector('form');
    const paybillBank = document.getElementById('paybill-bank');
    const billerAccount = document.getElementById('biller-account');
    const paybillAmount = document.getElementById('paybill-amount');
    const paybillPin = document.getElementById('paybill-pin');

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
    });

    // --- Bonus Logic ---
    const bonusForm = sections.bonus.querySelector('form');
    const bonusCoupon = document.getElementById('bonus-coupon');
    bonusForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!bonusCoupon.value.trim()) return alert("Enter your coupon.");
        // Example: Add 100 as bonus
        const currentBalance = parseInt(avlBlnc.innerText) || 0;
        avlBlnc.innerText = currentBalance + 100;
        alert("Bonus added!");
        bonusForm.reset();
        showSection(sections.latestActivity);
    });

    // --- Transfer Money Logic ---
    const transferForm = sections.transfer.querySelector('form');
    const transferAccount = document.getElementById('transfer-account');
    const transferAmount = document.getElementById('transfer-amount');
    const transferPin = document.getElementById('transfer-pin');
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
    });
});