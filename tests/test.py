from src.codigo_prueba import Calculadora

def test_suma():
    assert Calculadora().suma(2,2) == 4

def test_resta():
    assert Calculadora().resta(3,2) == 1