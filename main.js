var bitcoinCalculator = angular.module('bitcoinCalculator', ['nvd3ChartDirectives']);

bitcoinCalculator.controller('bitcoinController', function ($scope, $http) {
    // Fetching the current USD to BTC rate
    $http.get("https://bitpay.com/api/rates")
    .success(function(data) {
        $scope.rates = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].code == "USD") {
                $scope.currRate = data[i].rate;
            }
        }
        $scope.initialAmt = 5000;

        // Function to calculate investment at different price points
        $scope.newAmt = function(price) {
            return ($scope.initialAmt / $scope.currRate) * price;
        };
        
        // Function to calculate profit
        $scope.profit = function(price) {
            var newAmount = $scope.newAmt(price);
            var profit = newAmount - $scope.initialAmt;
            return -profit;
          };    
    });
    // Convert BTC to selected currency
    $scope.convertToCurrency = function() {
        if ($scope.selectedCurrency && $scope.btcAmount) {
            var rate = $scope.rates.find(rate => rate.code === $scope.selectedCurrency);
            if (rate) {
                $scope.currencyAmount = $scope.btcAmount * rate.rate;
            } else {
                $scope.currencyAmount = 0;
            }
        } else {
            $scope.currencyAmount = 0;
        }
    };

    // Format the x-axis for the chart
    $scope.xAxisTickFormatFunction = function() {
        return function(date) {
            return d3.time.format('%x')(new Date(date));
        };
    };

    // Placeholder for historical data
    $scope.bitcoinHistoricalData = [{
        "key": "Prices",
        "values": values
    }];
    
});
