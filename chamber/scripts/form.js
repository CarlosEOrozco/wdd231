document.addEventListener('DOMContentLoaded', () => {
    // Set current timestamp in hidden input
    const timestampInput = document.getElementById('timestamp');
    timestampInput.value = new Date().toISOString();
});
