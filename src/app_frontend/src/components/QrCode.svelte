<script>
    import { Html5QrcodeScanner } from "html5-qrcode";
    import  qrcode  from "qrcode-generator"
    // new Html5QrcodeScanner('reader', {})

    let typeNumber = 4;
    let errorCorrectionLevel = 'L';
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    console.log(qr)
    qr.addData("https://www.youtube.com/watch?v=BBJa32lCaaY");
    qr.make();
    let qrImageTag = qr.createImgTag(6).replace('<img', '<img style="border-radius:14px;"');
</script>


<div class="w-[160px] h-[160px] flex flex-col mt-6 mb-4">
    {@html qrImageTag}
</div>