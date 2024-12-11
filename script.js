// Extract UID or Username from Facebook Profile URL
function extractUID(button) {
    const profileURL = document.getElementById('profileInput').value.trim();
    const output = document.getElementById('output');

    // Show loading effect on button
    button.textContent = "Processing...";
    button.disabled = true;

    setTimeout(() => {
        let uid = null;

        try {
            const url = new URL(profileURL);

            // Case 1: Numeric UID in URL (e.g., facebook.com/123456789)
            const numericMatch = url.pathname.match(/\/(\d+)(\/|$)/);
            if (numericMatch) {
                uid = numericMatch[1];
            }
            // Case 2: Username in URL (e.g., facebook.com/username)
            else if (url.pathname.split('/')[1]) {
                const username = url.pathname.split('/')[1];
                if (username && username !== "profile.php") {
                    uid = `Username: ${username}`;
                }
            }
            // Case 3: URL using `profile.php` with `id` parameter
            if (!uid && url.pathname === "/profile.php" && url.searchParams.get('id')) {
                uid = url.searchParams.get('id');
            }

            // Display result
            if (uid) {
                output.value = uid;
                button.textContent = "UID Extracted!";
            } else {
                output.value = "No UID or Username Found!";
                button.textContent = "Error!";
            }
        } catch (error) {
            output.value = "Invalid URL!";
            button.textContent = "Error!";
        }

        button.disabled = false;

        // Reset button text after 3 seconds
        setTimeout(() => {
            button.textContent = "Extract UID";
        }, 3000);
    }, 1500); // Simulated processing time
}

// Copy UID to Clipboard
function copyToClipboard(button) {
    const output = document.getElementById('output');
    if (output.value) {
        output.select();
        document.execCommand('copy');

        // Show success message in button
        button.textContent = "Copied!";
        setTimeout(() => {
            button.textContent = "Copy UID";
        }, 2000);
    } else {
        button.textContent = "No UID to Copy!";
        setTimeout(() => {
            button.textContent = "Copy UID";
        }, 2000);
    }
}