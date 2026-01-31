Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch '<div id="floating-hamburger">') {
        $content = $content -replace '(</nav>)(\s*)', "`$1`n<div id=`"floating-hamburger`">`n    <span></span>`n    <span></span>`n    <span></span>`n</div>`n`$2"
        Set-Content $_.FullName $content
    }
    if ($content -notmatch '<script src="shared-ui.js"></script>') {
        $content = $content -replace '(</body>)', "`n<script src=`"shared-ui.js`"></script>`n`$1"
        Set-Content $_.FullName $content
    }
}
