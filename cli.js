#!/usr/bin/env node

const NFTRarityAnalyzer = require('./index');

function showHelp() {
    console.log(`
NFT Rarity Analyzer CLI

Usage:
  node cli.js <command> [options]

Commands:
  analyze <file>              Analyze collection and show attribute breakdown
  rarity <file> <token_id>    Calculate rarity for specific token

Options:
  --method <method>           Rarity calculation method:
                             - statistical (default)
                             - trait_normalization  

Examples:
  node cli.js analyze sample-data.json
  node cli.js rarity sample-data.json 1
  node cli.js rarity sample-data.json 1 --method trait_normalization
`);
}

async function analyzeCollection(filePath) {
    const analyzer = new NFTRarityAnalyzer();
    
    if (!await analyzer.loadCollection(filePath)) {
        process.exit(1);
    }
    
    analyzer.analyzeAttributes();
    
    console.log('\nAttribute Distribution:');
    Object.keys(analyzer.attributes).forEach(traitType => {
        console.log(`\n${traitType}:`);
        Object.keys(analyzer.attributes[traitType]).forEach(value => {
            const count = analyzer.attributes[traitType][value];
            const percentage = ((count / analyzer.collection.length) * 100).toFixed(1);
            console.log(`  ${value}: ${count} (${percentage}%)`);
        });
    });
}

async function calculateTokenRarity(filePath, tokenId, method) {
    const analyzer = new NFTRarityAnalyzer();
    
    if (!await analyzer.loadCollection(filePath)) {
        process.exit(1);
    }
    
    analyzer.analyzeAttributes();
    const rarity = analyzer.calculateRarity(tokenId, method);
    
    if (rarity === null) {
        console.error(`Token ${tokenId} not found in collection`);
        process.exit(1);
    }
}

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        showHelp();
        return;
    }
    
    const command = args[0];
    
    switch (command) {
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
            
        case 'analyze':
            if (args.length < 2) {
                console.error('Error: Missing file path');
                showHelp();
                process.exit(1);
            }
            await analyzeCollection(args[1]);
            break;
            
        case 'rarity':
            if (args.length < 3) {
                console.error('Error: Missing file path or token ID');
                showHelp();
                process.exit(1);
            }
            const method = args.includes('--method') ? args[args.indexOf('--method') + 1] : 'statistical';
            await calculateTokenRarity(args[1], args[2], method);
            break;
            
        default:
            console.error(`Unknown command: ${command}`);
            showHelp();
            process.exit(1);
    }
}

main().catch(console.error);