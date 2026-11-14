/* 1.  HTML ELEMENTS SELECTION */

const postsContainer = document.getElementById("postsContainer");

const statusMessage = document.getElementById("statusMessage");

const searchInput = document.getElementById("searchInput");

const userFilter = document.getElementById("userFilter");

const reloadBtn = document.getElementById("reloadBtn");

const loadMoreBtn = document.getElementById("loadMoreBtn");

const postsCount = document.getElementById("postsCount");

const themeBtn = document.getElementById("themeBtn");


/*  2. VARIABLES */

// API endpoint
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Store all fetched posts
let allPosts = [];

// Number of posts to display initially
const POSTS_PER_PAGE = 9;

// Number of posts currently displayed
let visiblePosts = POSTS_PER_PAGE;


/* 3. FETCH POSTS FROM API */

async function fetchPosts() {

    // Show loading message
    statusMessage.textContent = "Loading posts... Please wait.";

    statusMessage.classList.remove("error");

    // Clear previous posts
    postsContainer.innerHTML = "";

    postsCount.textContent = "";

    // Disable buttons while loading
    reloadBtn.disabled = false;
    loadMoreBtn.disabled = false;
    
    loadMoreBtn.hidden = true;
  
    try {

        // Send request to API
        const response = await fetch(API_URL);

        // Check whether the request was successful
        if (!response.ok) {
            throw new Error("Unable to fetch posts. Please try again.");
        }

        // Convert API response into JavaScript data
        const data = await response.json();

        // Store fetched posts
        allPosts = data;

        // Reset pagination
        visiblePosts = POSTS_PER_PAGE;

        // Clear loading message
        statusMessage.textContent = "";

        // Display posts
        displayPosts();

    } catch (error) {

        // Display useful error message
        statusMessage.textContent =
            "Something went wrong: " + error.message +
            " Check your internet connection and try again.";

        statusMessage.classList.add("error");

        postsContainer.innerHTML = "";

        postsCount.textContent = "";

        // Hide Load More button
        loadMoreBtn.hidden = true;

        console.error("Fetch Error:", error);

    } finally {

        // Enable reload button
        reloadBtn.disabled = false;

    }
}


/* =====================================
   4. FILTER AND SEARCH POSTS
===================================== */

function getFilteredPosts() {

    // Get search input and convert to lowercase
    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    // Get selected user ID
    const selectedUser = userFilter.value;

    // Filter posts based on search and user ID
    return allPosts.filter(post => {

        const matchesTitle = post.title
            .toLowerCase()
            .includes(searchValue);

        const matchesUser =
            selectedUser === "all" ||
            post.userId.toString() === selectedUser;

        return matchesTitle && matchesUser;

    });
}


/* =====================================
   5. DISPLAY POSTS DYNAMICALLY
===================================== */

function displayPosts() {

    // Clear existing posts
    postsContainer.innerHTML = "";

    // Get filtered posts
    const filteredPosts = getFilteredPosts();

    // Get only the posts needed for current page
    const visibleItems = filteredPosts.slice(0, visiblePosts);

    // Update post count
    postsCount.textContent =
        `Showing ${visibleItems.length} of ${filteredPosts.length} posts`;

    // Handle empty search/filter results
    if (filteredPosts.length === 0) {

        statusMessage.textContent =
            "No posts found. Try another search or filter.";

        loadMoreBtn.hidden = true;

        return;
    }

    // Clear status message
    statusMessage.textContent = "";

    // Create post cards
    visibleItems.forEach(post => {

        // Create card
        const card = document.createElement("article");
        card.className = "post-card";

        // Create title
        const title = document.createElement("h2");
        title.textContent = post.title;

        // Create readable preview
        const body = document.createElement("p");
        body.textContent = post.body;

        // Create post information
        const meta = document.createElement("div");
        meta.className = "post-meta";
        meta.textContent =
            `Post ID: ${post.id} | User ID: ${post.userId}`;

        // Add elements to card
        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(meta);

        // Add card to posts container
        postsContainer.appendChild(card);

    });

    // Show or hide Load More button
    loadMoreBtn.hidden =
        visiblePosts >= filteredPosts.length;

}


/* =====================================
   6. LOAD MORE POSTS
===================================== */

function loadMorePosts() {

    // Increase visible posts by 9
    visiblePosts += POSTS_PER_PAGE;

    // Display additional posts
    displayPosts();

}


/* =====================================
   7. RELOAD POSTS
===================================== */

reloadBtn.addEventListener("click", () => {

    // Clear search
    searchInput.value = "";

    // Reset user filter
    userFilter.value = "all";

    // Fetch posts again
    fetchPosts();

});


/* =====================================
   8. SEARCH EVENT
===================================== */

searchInput.addEventListener("input", () => {

    // Reset pagination after search
    visiblePosts = POSTS_PER_PAGE;

    displayPosts();

});


/* =====================================
   9. USER FILTER EVENT
===================================== */

userFilter.addEventListener("change", () => {

    // Reset pagination after filtering
    visiblePosts = POSTS_PER_PAGE;

    displayPosts();

});


/* =====================================
   10. LOAD MORE EVENT
===================================== */

loadMoreBtn.addEventListener("click", loadMorePosts);


/* =====================================
   11. DARK MODE TOGGLE
===================================== */

// Restore saved theme when page loads
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️ Light Mode";

}

// Toggle theme when button is clicked
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    // Check current theme
    const isDark = document.body.classList.contains("dark");

    if (isDark) {

        themeBtn.textContent = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");

    }

});


/* =====================================
   12. INITIALIZE APPLICATION
===================================== */

// Fetch posts automatically when page loads
fetchPosts();
