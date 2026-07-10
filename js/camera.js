document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('capture-toggle');
    const preview = document.getElementById('camera-preview');
    let stream = null;

    if (!toggle || !preview) return;

    const stopStream = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            stream = null;
        }
        preview.srcObject = null;
    };

    toggle.addEventListener('change', async () => {
        if (!toggle.checked) {
            stopStream();
            return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            toggle.checked = false;
            return;
        }

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            });

            preview.srcObject = stream;
            preview.play().catch(() => {});
        } catch (error) {
            toggle.checked = false;
            console.error('Camera access failed:', error);
        }
    });
});
