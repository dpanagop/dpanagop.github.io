/**
 * freshness.js
 * Fetches the latest commit date from GitHub and updates the footer and JSON-LD.
 */

document.addEventListener("DOMContentLoaded", async () => {
    const repoOwner = "dpanagop";
    // Assuming the repo name matches the GitHub Pages pattern or the folder name. 
    // Please update this if your repo name is different (e.g., 'antigravity_personal_site').
    const repoName = "dpanagop.github.io";
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1`;
    const lastUpdatedElement = document.getElementById("last-updated");

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch commit data");

        const data = await response.json();
        const lastCommitDate = new Date(data[0].commit.committer.date);

        // Format date: "February 2026" or "Feb 13, 2026"
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = lastCommitDate.toLocaleDateString('en-US', options);

        // 1. Update HTML Footer
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = `Last updated: ${formattedDate}`;
        }

        // 2. Update JSON-LD
        const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        if (jsonLdScript) {
            const ldData = JSON.parse(jsonLdScript.textContent);
            // ISO 8601 format YYYY-MM-DD
            ldData.dateModified = lastCommitDate.toISOString().split('T')[0];
            jsonLdScript.textContent = JSON.stringify(ldData, null, 2);
            console.log("Updated JSON-LD dateModified to:", ldData.dateModified);
        }

    } catch (error) {
        console.error("Error fetching freshness data:", error);
        // Fallback is already static in HTML (manually set during build/edit)
    }
});
