double potencia(double @base, double @exp) {
    return @exp == 0 ? 1 : @base * potencia(@base, @exp - 1);
}

int factorial(int @n) {
    return @n == 0 ? 1 : @n * factorial(@n - 1);
}

int modulo(double @n, double @p) {
    return @n < @p ? @n : modulo(@n - @p, @p);
}

int mcd(int @a, int @b) {
    return @b == 0 ?  @a : mcd(@b, modulo(@a, @b));
}

int fibonaci(int @n){
    return (@n==1 || @n==2) ? 1 : fibonaci(@n-1) + fibonaci(@n-2);
} 

int ackermann(int @m, int @n) {
    if (@m == 0) {
        return (@n + 1);
    } else if (@m > 0 && @n == 0) {
        return ackermann(@m - 1, 1);
    } else {
        return ackermann(@m - 1, ackermann(@m, @n - 1));
    }
}

procedure Hanoi(int @discos, String @origen, String @aux, String @destino), () {
    if (@discos == 1) {
        LOG("mover disco de " + @origen + " a " + @destino);
    } else {
        call Hanoi(@discos - 1, @origen, @destino, @aux);
        log("mover disco de " + @origen + " a " + @destino);
        call Hanoi(@discos - 1, @aux, @origen, @destino);
    }
}

int hofstaderFemenina(int @n) {
    if (@n < 0) {
        return 0;
    } else {
        return (@n == 0) ? 1 : @n - hofstaderFemenina(@n - 1);
    }
}

int hofstaderMasculino(int @n) {
    if (@n < 0) {
        return 0;
    } else {
        return @n == 0 ? 0 : @n - hofstaderMasculino(@n - 1);
    }
}

int par(int @nump) {
    if (@nump == 0) {
        return 1;
    }
    return impar(@nump - 1);
}

int impar(int @numi) {
    if (@numi == 0) {
        return 0;
    }
    return par(@numi - 1);
}

log(potencia(3,2)); 
log(factorial(5)); 
log(modulo(4,2)); 
log(mcd(6,6)); 
log(fibonaci(8)); 
log(ackermann(3,6)); 
call Hanoi(4, "1", "2", "3"); 
log(hofstaderFemenina(19));
log(hofstaderMasculino(19));
log(par(6));
log(impar(50));

