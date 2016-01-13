package org.apache.catalina;

class One {
	protected int a;

	public void setOne(int x) {
		a = x;
	}

	public void showOne() {
		System.out.println("a=" + a);
	}
}

public class Test extends One {
	public void setTwo(int x) {
		setOne(x);
	}

	public static void main(String[] args) {
		Test obj = new Test();
		obj.setTwo(10);
		System.out.println("a=" + obj.a); // 应改为： obj.showOne();
	}
}
