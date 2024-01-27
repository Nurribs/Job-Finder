// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Akıllı kontratın adı
contract SimpleToken {
    // Token adı
    string public name = "Simple Token";
    
    // Token sembolü
    string public symbol = "ST";

    // Toplam token arzı
    uint256 public totalSupply = 1000000;

    // Token sahiplerinin bakiyeleri
    mapping(address => uint256) public balanceOf;

    // Transfer olayı
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Kontrat oluşturulduğunda yapılacak işlemler
    constructor() {
        // Kontrat yaratıcı tarafından tüm token'ları alır
        balanceOf[msg.sender] = totalSupply;
    }

    // Token transfer fonksiyonu
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // Gönderici bakiyesi yeterli mi?
        require(balanceOf[msg.sender] >= _value, "Yetersiz bakiye");

        // Taşıma işlemi gerçekleştiriliyor
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        // Transfer olayını tetikle
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
