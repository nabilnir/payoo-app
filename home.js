document.addEventListener('DOMContentLoaded', function () {
    const trsxData = [
        { name: "Electricity Bill", date: "Today 01:08 AM", amount: -120, type: "bill", icon: "bolt" },
        { name: "Bank Deposit", date: "Today 07:24 PM", amount: 500, type: "deposit", icon: "building" },
        { name: "Mobile Recharge", date: "Today 05:30 PM", amount: -50, type: "recharge", icon: "mobile" },
        { name: "Gas Bill", date: "Today 08:34 AM", amount: -85, type: "bill", icon: "fire" }
    ];

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
            if (section) section.classList.remove('active');
        });
    }

    // Helper to set active button style
    function setActiveBtn(activeBtn) {
        Object.values(toggles).forEach(btn => {
            if (btn) btn.classList.remove('active-btn');
        });
        if (activeBtn) {
            activeBtn.classList.add('active-btn');
        }
    }

    // Show section helper
    function showSection(section) {
        hideAllSections();
        if (section) section.classList.add('active');
    }

    // Set initial state - show only latest activity and set its button as active
    hideAllSections();
    if (sections.latestActivity) sections.latestActivity.classList.add('active');
    setActiveBtn(toggles.transaction);

    // Common handler for toggles
    function handleToggle(toggleKey, sectionKey) {
        if (toggles[toggleKey] && sections[sectionKey]) {
            toggles[toggleKey].addEventListener('click', () => {
                setActiveBtn(toggles[toggleKey]);
                showSection(sections[sectionKey]);
            });
        }
    }

    // Attach handlers
    handleToggle('addMoney', 'addMoney');
    handleToggle('cashout', 'cashout');
    handleToggle('transfer', 'transfer');
    handleToggle('bonus', 'bonus');
    handleToggle('paybill', 'paybill');
    handleToggle('transaction', 'latestActivity');

    // Close button listeners
    Object.entries(closeButtons).forEach(([key, button]) => {
        if (button) {
            button.addEventListener('click', () => {
                showSection(sections.latestActivity);
                setActiveBtn(toggles.transaction);
            });
        }
    });

    // Get balance element
    const avlBlnc = document.getElementById("av-blnc");

    // Transaction History Logic
    function renderTransactions() {
        const trsxContainer = document.getElementById("transaction-container");
        if (!trsxContainer) return;

        trsxContainer.innerHTML = "";

        if (trsxData.length === 0) {
            trsxContainer.innerHTML = '<p class="text-center text-gray-500 py-8 text-lg">No transactions yet</p>';
            return;
        }

        // Sort by most recent first (assuming newer entries are added to the beginning)
        trsxData.forEach(data => {
            const transactionEl = document.createElement("div");
            transactionEl.className = "transaction-item flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 shadow-sm";

            // Determine icon and colors based on transaction type
            let iconClass = "fa-solid fa-";
            let iconBg = "bg-blue-100";
            let iconColor = "text-blue-600";

            if (data.type === "bill") {
                iconClass += "file-invoice-dollar";
                iconBg = "bg-red-100";
                iconColor = "text-red-600";
            } else if (data.type === "deposit") {
                iconClass += "building";
                iconBg = "bg-green-100";
                iconColor = "text-green-600";
            } else if (data.type === "recharge") {
                iconClass += "mobile";
                iconBg = "bg-purple-100";
                iconColor = "text-purple-600";
            } else if (data.type === "cashout") {
                iconClass += "money-bill-transfer";
                iconBg = "bg-orange-100";
                iconColor = "text-orange-600";
            } else if (data.type === "transfer") {
                iconClass += "paper-plane";
                iconBg = "bg-purple-100";
                iconColor = "text-purple-600";
            } else if (data.type === "bonus") {
                iconClass += "gift";
                iconBg = "bg-yellow-100";
                iconColor = "text-yellow-600";
            } else {
                iconClass += data.icon || "receipt";
            }

            // Format amount with color
            const amountClass = data.amount < 0 ? "text-red-600" : "text-green-600";
            const amountSign = data.amount < 0 ? "-$" : "+$";
            const amountValue = Math.abs(data.amount);

            transactionEl.innerHTML = `
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center">
                                <i class="${iconClass} ${iconColor} text-lg"></i>
                            </div>
                            <div>
                                <div class="font-semibold text-gray-800">${data.name}</div>
                                <div class="text-sm text-gray-500">${data.date}</div>
                            </div>
                        </div>
                        <div class="${amountClass} font-bold text-lg">${amountSign}${amountValue}</div>
                    `;

            trsxContainer.appendChild(transactionEl);
        });
    }

    // Initial render of transactions
    renderTransactions();

    // Update transaction list when transaction toggle is clicked
    if (toggles.transaction) {
        toggles.transaction.addEventListener('click', renderTransactions);
    }

    // Helper function to show success message and return to transactions
    function showSuccessAndReturn(message) {
        alert(message);
        showSection(sections.latestActivity);
        setActiveBtn(toggles.transaction);
        renderTransactions();
    }

    // Helper function to add transaction to history
    function addToHistory(name, amount, type) {
        const now = new Date();
        const timeString = `Today ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

        trsxData.unshift({
            name: name,
            date: timeString,
            amount: amount,
            type: type,
            icon: type === "deposit" ? "plus" : "minus"
        });
    }

    // Add Money Logic
    const addMoneyForm = document.getElementById('add-money-form');
    if (addMoneyForm) {
        addMoneyForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const bankSelect = document.getElementById('bank-select');
            const accountNumber = document.getElementById('account-number');
            const addAmount = document.getElementById('add-amount');
            const pinNum = document.getElementById('pin-num');

            let errors = [];
            if (!bankSelect.value || bankSelect.value === "Select bank") {
                errors.push("Please select a bank.");
            }
            if (!/^\d{11}$/.test(accountNumber.value.trim())) {
                errors.push("Bank account number must be exactly 11 digits.");
            }
            if (!addAmount.value || isNaN(addAmount.value) || Number(addAmount.value) <= 0) {
                errors.push("Please enter a valid amount greater than 0.");
            }
            if (!/^\d{4}$/.test(pinNum.value.trim())) {
                errors.push("Pin number must be exactly 4 digits.");
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            const amountToAdd = Number(addAmount.value);
            avlBlnc.innerText = currentBalance + amountToAdd;

            addToHistory("Money Added", amountToAdd, "deposit");
            addMoneyForm.reset();
            showSuccessAndReturn("Money added successfully!");
        });
    }

    // Cash Out Logic
    const cashoutForm = document.getElementById('cashout-form');
    if (cashoutForm) {
        cashoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const agentNumber = document.getElementById('agent-number');
            const cashoutAmount = document.getElementById('cashout-amount');
            const cashoutPin = document.getElementById('cashout-pin');

            let errors = [];
            if (!/^\d{11}$/.test(agentNumber.value.trim())) {
                errors.push("Agent number must be exactly 11 digits.");
            }
            if (!cashoutAmount.value || isNaN(cashoutAmount.value) || Number(cashoutAmount.value) <= 0) {
                errors.push("Please enter a valid amount greater than 0.");
            }
            if (!/^\d{4}$/.test(cashoutPin.value.trim())) {
                errors.push("Pin number must be exactly 4 digits.");
            }

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            if (Number(cashoutAmount.value) > currentBalance) {
                errors.push("Insufficient balance.");
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            const amountToCashout = Number(cashoutAmount.value);
            avlBlnc.innerText = currentBalance - amountToCashout;

            addToHistory("Cash Out", -amountToCashout, "cashout");
            cashoutForm.reset();
            showSuccessAndReturn("Cash out successful!");
        });
    }

    // Pay Bill Logic
    const paybillForm = document.getElementById('paybill-form');
    if (paybillForm) {
        paybillForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const paybillBank = document.getElementById('paybill-bank');
            const billerAccount = document.getElementById('biller-account');
            const paybillAmount = document.getElementById('paybill-amount');
            const paybillPin = document.getElementById('paybill-pin');

            let errors = [];
            if (!paybillBank.value || paybillBank.value === "Select biller") {
                errors.push("Please select a biller.");
            }
            if (!billerAccount.value.trim()) {
                errors.push("Please enter biller account number.");
            }
            if (!paybillAmount.value || isNaN(paybillAmount.value) || Number(paybillAmount.value) <= 0) {
                errors.push("Please enter a valid amount greater than 0.");
            }
            if (!/^\d{4}$/.test(paybillPin.value.trim())) {
                errors.push("Pin number must be exactly 4 digits.");
            }

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            if (Number(paybillAmount.value) > currentBalance) {
                errors.push("Insufficient balance.");
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            const amountToPay = Number(paybillAmount.value);
            avlBlnc.innerText = currentBalance - amountToPay;

            addToHistory(`${paybillBank.value} Bill`, -amountToPay, "bill");
            paybillForm.reset();
            showSuccessAndReturn("Bill paid successfully!");
        });
    }

    // Bonus Logic
    const bonusForm = document.getElementById('bonus-form');
    if (bonusForm) {
        bonusForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const bonusCoupon = document.getElementById('bonus-coupon');

            if (!bonusCoupon.value.trim()) {
                alert("Please enter your coupon code.");
                return;
            }

            // Example: Add different bonus amounts based on coupon
            let bonusAmount = 100; // default bonus
            const couponCode = bonusCoupon.value.trim().toLowerCase();

            if (couponCode === "welcome100") {
                bonusAmount = 100;
            } else if (couponCode === "bonus200") {
                bonusAmount = 200;
            } else if (couponCode === "mega500") {
                bonusAmount = 500;
            } else {
                // For demo, any other coupon gives 50
                bonusAmount = 50;
            }

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            avlBlnc.innerText = currentBalance + bonusAmount;

            addToHistory("Bonus Added", bonusAmount, "bonus");
            bonusForm.reset();
            showSuccessAndReturn(`Congratulations! ${bonusAmount} bonus added to your account!`);
        });
    }

    // Transfer Money Logic
    const transferForm = document.getElementById('transfer-form');
    if (transferForm) {
        transferForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const transferAccount = document.getElementById('transfer-account');
            const transferAmount = document.getElementById('transfer-amount');
            const transferPin = document.getElementById('transfer-pin');

            let errors = [];
            if (!/^\d{11}$/.test(transferAccount.value.trim())) {
                errors.push("User account number must be exactly 11 digits.");
            }
            if (!transferAmount.value || isNaN(transferAmount.value) || Number(transferAmount.value) <= 0) {
                errors.push("Please enter a valid amount greater than 0.");
            }
            if (!/^\d{4}$/.test(transferPin.value.trim())) {
                errors.push("Pin number must be exactly 4 digits.");
            }

            const currentBalance = parseInt(avlBlnc.innerText) || 0;
            if (Number(transferAmount.value) > currentBalance) {
                errors.push("Insufficient balance.");
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            const amountToTransfer = Number(transferAmount.value);
            avlBlnc.innerText = currentBalance - amountToTransfer;

            addToHistory("Money Transfer", -amountToTransfer, "transfer");
            transferForm.reset();
            showSuccessAndReturn("Money transferred successfully!");
        });
    }
});
