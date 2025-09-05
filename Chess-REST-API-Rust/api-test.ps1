# Perform a health check:
$Params = @{
    Uri = 'http://localhost:3600/health'
    Method = 'Get'
}

Invoke-RestMethod @Params

# Send a malformed FEN string (expect a 422):
$Params = @{
    Uri = 'http://localhost:3600/chess/check-fen'
    Method = 'Post'
    Body = 'testing123' | ConvertTo-Json
    ContentType = 'application/json'
}

Invoke-RestMethod @Params

# Send a FEN string (expect a 200 Success and FEN bounceback):
$Params = @{
    Uri = 'http://localhost:3600/chess/check-fen'
    Method = 'Post'
    Body = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' | ConvertTo-Json
    ContentType = 'application/json'
}

Invoke-RestMethod @Params