
<?php
  require_once 'config.php';
  $conn = new mysqli("localhost", "root", "", "ecommerceusados");
  $result = $conn->query("SELECT * FROM produtos");
?>


<table>
  <?php while ($row = $result->fetch_assoc()): ?>
    <tr>
      <td><?php echo $row['nome']; ?></td>
      <td><?php echo $row['descricao']; ?></td>
      <td><?php echo $row['preco']; ?></td>
      <td><?php echo $row['img']; ?></td>
      <td><?php echo $row['data']; ?></td>
      <td><?php echo $row['estado']; ?></td>
      <td><?php echo $row['categoria']; ?></td>
    </tr>
  <?php endwhile; ?>
</table>