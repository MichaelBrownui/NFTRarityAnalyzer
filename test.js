const NFTRarityAnalyzer = require('./index');

async function testAnalyzer() {
    const analyzer = new NFTRarityAnalyzer();
    
    console.log('Testing NFT Rarity Analyzer...\n');
    
    const loaded = await analyzer.loadCollection('./sample-data.json');
    if (!loaded) {
        console.error('Failed to load sample data');
        return;
    }
    
    analyzer.analyzeAttributes();
    
    console.log('\n--- Calculating rarity for token #1 ---');
    analyzer.calculateRarity('1');
    
    console.log('\n--- Calculating rarity for token #2 ---');
    analyzer.calculateRarity('2');
}

testAnalyzer().catch(console.error);