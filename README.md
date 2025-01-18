# NFT Rarity Analyzer

A command-line tool to analyze the rarity of NFTs based on their metadata attributes.

## Features

- Analyze NFT collection metadata and attribute distribution  
- Calculate rarity scores using multiple methods:
  - Statistical rarity (percentage-based)
  - Trait normalization (inverse frequency weighting)
- Easy-to-use CLI interface

## Installation

```bash
npm install
```

## CLI Usage

### Analyze Collection
```bash
node cli.js analyze sample-data.json
```

### Calculate Token Rarity
```bash
node cli.js rarity sample-data.json 1
node cli.js rarity sample-data.json 1 --method trait_normalization
```

## Testing

```bash
npm test
```