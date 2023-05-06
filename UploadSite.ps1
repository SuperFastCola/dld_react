$bucketName = $args[0];
$filesTORemove = @();

#get a list of files in the bucket
foreach ($f in Get-S3Object -ProfileName Deluxe -BucketName $bucketName ) {
    $filesTORemove += $f.Key;
}
#if there are files in bucket - remove them
if($filesTORemove.Count -gt 0){
    Write-Output "Deleting $($filesTORemove)";
    Remove-S3Object -ProfileName Deluxe -BucketName $bucketName  -KeyCollection $filesTORemove;
}

#cycle through elements on local directory 
$buildFolder = "$(Get-Location)\build\";

Get-ChildItem -Path $buildFolder  |
Foreach-Object {    
    #if directory write object as folder 
    if($_.PSisContainer -and $_.Name -ne "static"){
        Write-Output "Uploading Folder: $($_.FullName)";
        Write-S3Object -ProfileName Deluxe -BucketName $bucketName -Folder $_.FullName -KeyPrefix $_.Name; 
    }
    #write file
    if(!$_.PSisContainer){
        Write-Output "Uploading File: $($_.FullName)";
       Write-S3Object -ProfileName Deluxe -BucketName $bucketName  -File $_.FullName -Key $_.Name;
    }
}

Get-ChildItem -Path "$($buildFolder)\static\" |
Foreach-Object {   
    Write-Output "Uploading File: $($_.FullName)";
    Write-S3Object -ProfileName Deluxe -BucketName $bucketName -Folder $_.FullName -KeyPrefix "static\$($_.Name)"; 
}