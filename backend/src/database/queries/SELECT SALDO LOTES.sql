SELECT  entry.product, entry.lote, entry.quantitypr
FROM entry
WHERE 1=1
AND (SELECT SUM(quantitypr) 
        FROM entry
        INNER JOIN output ON entry.product = output.product)
   - (SELECT SUM(quantity)
        FROM output
        INNER JOIN entry ON entry.product = output.product)
   > 0