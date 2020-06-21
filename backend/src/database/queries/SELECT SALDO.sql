SELECT DISTINCT (select sum(quantitypr) from entry where product=1) as incomes, (select sum(quantity) from output where product='1') as outcomes
FROM entry
INNER JOIN output ON entry.product = output.product
WHERE outcomes <= incomes